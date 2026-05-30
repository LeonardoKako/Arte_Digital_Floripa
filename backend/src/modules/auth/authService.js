import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config'

async function cadastrarUsuario(cadastroBody) {
    const { nome, email, senha, tipoUsuario } = cadastroBody;

    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();
    const hashSenha = await bcrypt.hash(senha, 10);

    const resultado = await prisma.$transaction(async (tx) => {
        const cadastro = await tx.cadastro.create({
                data: {
                nome: nomeLimpo,
                email: emailLimpo,
                senha: hashSenha,
                tipo_usuario: tipoUsuario
            }
        });
        const usuario = await tx.usuario.create({
            data: {
                tipo_usuario: tipoUsuario,
                id_cadastro: cadastro.id_cadastro
            }
        });    
        
        return { cadastro, usuario };
    });

    const { senha: _, ...cadastroSemSenha } = resultado.cadastro;

    return { ...cadastroSemSenha, usuario: resultado.usuario };
}

async function login(loginBody) {
    const { email, senha } = loginBody;

    const usuario = await prisma.cadastro.findFirst({
        where: { email: email }
    });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    const token = jwt.sign(
        { id_cadastro: usuario.id_cadastro },
        process.env.JWT_PASSWORD,
        { expiresIn: '1d' }
    );

    const { senha: _, ...usuarioLogadoSemSenha } = usuario;

    return {
        usuario: usuarioLogadoSemSenha,
        token: token
    };
}

async function alterarSenha(idCadastro, senhaAtual, novaSenha) {
    const usuario = await prisma.cadastro.findUnique({
        where: { id_cadastro: idCadastro }
    });

    const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
    if(!senhaValida) throw new Error('Senha atual incorreta');

    const hashNovaSenha = await bcrypt.hash(novaSenha, 10);

    await prisma.cadastro.update({
        where: { id_cadastro: idCadastro },
        data: {
            senha: hashNovaSenha
        }
    });
}

export default {
    cadastrarUsuario,
    login,
    alterarSenha
}