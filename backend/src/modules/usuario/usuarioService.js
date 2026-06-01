import prisma from '../../db/prisma.js';
import emailService from "../../services/emailService.js";
import crypto from 'crypto';

async function listarUsuarios() {
    try {
        const usuarios = await prisma.cadastro.findMany({
            select: {
                id_cadastro: true,
                nome: true,
                email: true,
                tipo_usuario: true,
                data_cadastro: true
            }
        });
        return usuarios;
    } catch (error) {
        throw new Error("Mensagem: " + error);
    }
    
}

async function listarUsuarioPorId(idCadastro) {  
    try {
        

        const usuario = await prisma.cadastro.findUnique({
            where: { id_cadastro: idCadastro },
            select: {
                id_cadastro: true,
                nome: true,
                email: true,
                tipo_usuario: true,
                data_cadastro: true
            }
        });

        if (!usuario) throw new Error('Usuário não encontrado');

        return usuario;
    } catch(error) {
        throw new Error("Mensagem: " + error);
    }
}

async function cadastrarUsuario(cadastroBody) {
    // Token para completar cadastro com segurança
    const token = crypto.randomBytes(32).toString('hex');
    // Expiração do token = agora + 24 horas
    const expiracao = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const { email } = cadastroBody;

    const emailLimpo = email.trim().toLowerCase();

    const resultado = await prisma.$transaction(async (tx) => {
        const cadastro = await tx.cadastro.create({
                data: {
                email: emailLimpo,
                tipo_usuario: "admin",
                token_temporario: token,
                token_expiracao: expiracao
            }
        });
        const usuario = await tx.usuario.create({
            data: {
                tipo_usuario: 'admin',
                id_cadastro: cadastro.id_cadastro
            }
        });   
        
        return { cadastro, usuario };
    });

    await emailService.enviarEmailBoasVindas(emailLimpo, token);
}

async function atualizarUsuario(idCadastro, registroBody) {
    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idCadastro);

    const { nome, email, tipoUsuario } = registroBody;

    const dadosParaAtualizar = {};

    if (nome) dadosParaAtualizar.nome =  nome.trim();
    if (email) dadosParaAtualizar.email = email.trim().toLowerCase();
    if (tipoUsuario) dadosParaAtualizar.tipoUsuario = tipoUsuario;

    const cadastroAtualizado = await prisma.cadastro.update({
        where: { id_cadastro: idCadastro },
        data: dadosParaAtualizar
    });

    if(tipoUsuario) {
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id_cadastro: idCadastro },
            data: { tipo_usuario: tipoUsuario }
        });
    }

    const { senha: _, token_temporario: __, token_expiracao: __, ...cadastroSemSenha } = cadastroAtualizado;

    return cadastroSemSenha;
}

async function deletarUsuario(idCadastro) {

    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idCadastro);
    
    const registro = await prisma.cadastro.delete({
        where: { id_cadastro: idCadastro }
    });
}

export default {
    listarUsuarios,
    listarUsuarioPorId,
    cadastrarUsuario,
    atualizarUsuario,
    deletarUsuario
}
