import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import crypto from 'crypto';
import emailService from "../../services/emailService.js";

async function completarCadastro(token, cadastroBody) {
    const cadastro = await prisma.cadastro.findFirst({
        where: { 
            token_temporario: token,
            token_expiracao: { gt: new Date() }
         }
    });
    if(!cadastro) throw new Error("Token inválido ou expirado!");

    const { nome, senha } = cadastroBody;
    const nomeLimpo = nome.trim();
    const hashSenha = await bcrypt.hash(senha, 10);

    const cadastroAtualizado = await prisma.cadastro.update({
        where: { id_cadastro: cadastro.id_cadastro },
        data: {
            nome: nomeLimpo,
            senha: hashSenha,
            token_temporario: null,
            token_expiracao: null
        }
    });

    const { senha: _, token_temporario: __, token_expiracao: ___, ...cadastroCompleto } = cadastroAtualizado;

    return cadastroCompleto;
}

async function login(loginBody) {
    const { email, senha } = loginBody;

    const usuario = await prisma.cadastro.findFirst({
        where: { email: email }
    });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error('Credenciais inválidas');

    const token = jwt.sign(
        { id_cadastro: usuario.id_cadastro },
        process.env.JWT_PASSWORD,
        { expiresIn: '1d' }
    );

    const { senha: _, token_temporario: __, token_expiracao: ___, ...usuarioLogadoSemSenha } = usuario;

    return {
        usuario: usuarioLogadoSemSenha,
        token: token
    };
}

async function recuperarSenha(email) {

    const emailLimpo = email.trim().toLowerCase();
    const usuario = await prisma.cadastro.findUnique({
        where: { email: emailLimpo }
    });

    // Não lança erro para não mostrar se email existe ou não no sistema
    if(!usuario) return;

    const token = crypto.randomBytes(32).toString('hex');
    const expiracao = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.cadastro.update({
        where: { id_cadastro: usuario.id_cadastro },
        data: {
            token_temporario: token,
            token_expiracao: expiracao
        }
    });

    await emailService.enviarEmailRecuperarSenha(emailLimpo, token);
}

async function redefinirSenha(token, novaSenha) {
    const usuario = await prisma.cadastro.findFirst({
        where: { 
            token_temporario: token,
            token_expiracao: { gt: new Date() }
        }
    });
    if(!usuario) throw new Error("Token inválido ou expirado.");

    const hashNovaSenha = await bcrypt.hash(novaSenha, 10);

    await prisma.cadastro.update({
        where: { id_cadastro: usuario.id_cadastro },
        data: {
            senha: hashNovaSenha
        }
    });
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
    completarCadastro,
    login,
    recuperarSenha,
    redefinirSenha,
    alterarSenha
}