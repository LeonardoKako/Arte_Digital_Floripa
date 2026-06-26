import prisma from "../../db/prisma.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import crypto from 'crypto';
import emailService from "../../services/emailService.js";

async function completarCadastro(token, cadastroBody) {
    // Erro 400 formato do token inválido
    if(!token || typeof token !== 'string') {
        const erro = new Error("Token inválido");
        erro.statusCode = 400;
        throw erro;
    } 
    const cadastro = await prisma.cadastro.findFirst({
        where: { 
            token_temporario: token,
            token_expiracao: { gt: new Date() }
         }
    });
    // Erro 401 Sem autorização para completar cadastro
    if(!cadastro) throw new Error("Token inválido ou expirado.");

    // Erro 400 body vazio
    if(!cadastroBody 
    || typeof cadastroBody !== 'object' 
    || Object.keys(cadastroBody).length === 0) {
        const erro = new Error("Dados de cadastro inválidos");
        erro.statusCode = 400;
        throw erro;
    }
    const { nome, senha } = cadastroBody;
    // Erro 400 formato errado
    if(typeof nome !== 'string' || typeof senha !== 'string') {
        const erro = new Error("Formato de nome ou senha inválido. Ambos devem ser string");
        erro.statusCode = 400;
        throw erro;
    }
    const nomeLimpo = nome.trim();

    if(!nomeLimpo || nomeLimpo.length === 0) {
        // Erro 400 nome vazio
        const erro = new Error("Nome não pode ter apenas espaços em branco ou estar vazio");
        erro.statusCode = 400;
        throw erro;
    }

    // Senha deve ter pelo menos uma letra maiúscula, uma minúscula, 1 número e mínimo de 8 caracteres
    // Não pode ter espaço em branco
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;
    if(!senhaRegex.test(senha)) {
        // Erro 400 senha fraca
        const erro = new Error("Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número.Espaços não são permitidos");
        erro.statusCode = 400;
        throw erro;
    }
    
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
    // Erro 400 body vazio
    if(!loginBody 
    || typeof loginBody !== 'object' 
    || Object.keys(loginBody).length === 0) {
        const erro = new Error("Dados de login inválidos");
        erro.statusCode = 400;
        throw erro;
    }
    const { email, senha } = loginBody;

    // Erro 400 vazio ou formato errado
    if(!email || typeof email !== 'string') throw new Error('Credenciais inválidas');
    if(!senha || typeof senha !== 'string') throw new Error('Credenciais inválidas');

    const emailLimpo = email.trim().toLowerCase();

    const usuario = await prisma.cadastro.findFirst({
        where: { email: emailLimpo }
    });

    // Erro 401 email incorreto
    if(!usuario) throw new Error('Credenciais inválidas');

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    // Erro 401 senha incorreta
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
    // Erro 400 email vazio ou formato errado
    if(!email || typeof email !== 'string') throw new Error("Email não é válido");
    const emailLimpo = email.trim().toLowerCase();
    // Erro 400 formato inválido
    if(!emailLimpo.includes("@")) {
        const erro = new Error("Formato do email inválido");
        erro.statusCode = 400;
        throw erro;
    } 
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
    // Erro 401 formato do token inválido
    if(!token || typeof token !== 'string') throw new Error("Token inválido ou expirado.");
    const usuario = await prisma.cadastro.findFirst({
        where: { 
            token_temporario: token,
            token_expiracao: { gt: new Date() }
        }
    });
    // Erro 401 sem permissão
    if(!usuario) throw new Error("Token inválido ou expirado.");

    if(!novaSenha || typeof novaSenha !== 'string') throw new Error("Senha inválida");

    // Senha deve ter pelo menos uma letra maiúscula, uma minúscula, 1 número e mínimo de 8 caracteres
    // Não pode ter espaço em branco
    const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S{8,}$/;
    if(!senhaRegex.test(novaSenha)) {
        // Erro 400 senha fraca
        const erro = new Error("Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número.Espaços não são permitidos");
        erro.statusCode = 400;
        throw erro;
    }

    const hashNovaSenha = await bcrypt.hash(novaSenha, 10);

    await prisma.cadastro.update({
        where: { id_cadastro: usuario.id_cadastro },
        data: {
            senha: hashNovaSenha,
            token_temporario: null,
            token_expiracao: null
        }
    });
}

// async function alterarSenha(idCadastro, senhaAtual, novaSenha) {
//     const usuario = await prisma.cadastro.findUnique({
//         where: { id_cadastro: idCadastro }
//     });

//     const senhaValida = await bcrypt.compare(senhaAtual, usuario.senha);
//     if(!senhaValida) throw new Error('Senha atual incorreta');
//     const hashNovaSenha = await bcrypt.hash(novaSenha, 10);

//     await prisma.cadastro.update({
//         where: { id_cadastro: idCadastro },
//         data: {
//             senha: hashNovaSenha
//         }
//     });
// }

export default {
    completarCadastro,
    login,
    recuperarSenha,
    redefinirSenha,
    // alterarSenha
}