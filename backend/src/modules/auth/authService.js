import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';

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
    alterarSenha
}