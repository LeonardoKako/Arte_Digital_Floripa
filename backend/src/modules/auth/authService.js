import prisma from "../../db/prisma.js";

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

export default {
    cadastrarUsuario
}