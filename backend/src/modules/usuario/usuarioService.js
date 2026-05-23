import prisma from '../../db/prisma.js'
import bcrypt from 'bcrypt';

// Banco ainda não foi criado
// Só trocar test pela coluna
async function listarUsuarios() {
    try {
        const usuarios = await prisma.test.findMany();
        return usuarios;
    } catch (error) {
        throw new Error("Mensagem: " + error);
    }
    
}

async function listarUsuarioPorId(id) {  
    try {
        // Confirmar se ID vai ser número
        const idUsuario = Number(id);

        const usuario = await prisma.test.findUnique({
            where: { id: idUsuario }
        });

        return usuario;
    } catch(error) {
        throw new Error("Mensagem: " + error);
    }
}

async function criarUsuario(usuarioBody) {
    const { nome, email, senha, tipoUsuario } = usuarioBody;

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const hashSenha = await bcrypt.hash(senha, 10);

    const usuarioCriado = await prisma.teste.create({
        data: {
            nome: nomeLimpo,
            email: emailLimpo,
            senha: hashSenha,
            tipoUsuario: tipoUsuario
        }
    });

    return usuarioCriado;
}

async function atualizarUsuario(id, usuarioBody) {
    // Verificar se o id vai ser Number no banco
    const idUsuario = Number(id);

    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idUsuario);

    const { nome, email, tipoUsuario } = usuarioBody;
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();

    const usuarioAtualizado = await prisma.teste.update({
        where: { id: idUsuario },
        data: {
            nome: nomeLimpo,
            email: emailLimpo,
            tipoUsuario: tipoUsuario
        }
    });

    return usuarioAtualizado;
}

async function deletarUsuario(id) {
    const idUsuario = Number(idUsuario);

    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idUsuario);

    const usuarioDeletado = await prisma.teste.delete({
        where: { id: idUsuario }
    });
}

export default {
    listarUsuarios,
    listarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
}
