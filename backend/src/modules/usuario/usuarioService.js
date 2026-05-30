import prisma from '../../db/prisma.js'

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
            where: { id_cadastro: idCadastro }
        });

        if (!usuario) throw new Error('Usuário não encontrado');

        return usuario;
    } catch(error) {
        throw new Error("Mensagem: " + error);
    }
}

async function atualizarUsuario(idCadastro, registroBody) {
    // Aproveita função de listarPorId e verifica se o usuário já existe
    await listarUsuarioPorId(idCadastro);

    const { nome, email, tipoUsuario } = registroBody;
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim().toLowerCase();


    const cadastroAtualizado = await prisma.cadastro.update({
        where: { id_cadastro: idCadastro },
        data: {
            nome: nomeLimpo,
            email: emailLimpo,
            tipo_usuario: tipoUsuario
        }
    });

    if(tipoUsuario) {
        const usuarioAtualizado = await prisma.usuario.update({
            where: { id_cadastro: idCadastro },
            data: { tipo_usuario: tipoUsuario }
        });
    }

    const { senha: _, ...cadastroSemSenha } = cadastroAtualizado;

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
    atualizarUsuario,
    deletarUsuario
}
