import prisma from '../../db/prisma.js';

async function listarObras() {
    return await prisma.acervo.findMany();
}

async function listarObraPorId(id) {
    return await prisma.acervo.findUnique({
        where: { id: parseInt(id) }
    });
}

async function criarObra(dados) {
    return await prisma.acervo.create({
        data: {
            titulo: dados.titulo,
            dataCriacao: dados.data ? new Date(dados.data) : null,
            descricao: dados.descricao || null,
            categoria: dados.categoria || null,
            idUsuario: parseInt(dados.idUsuario)
        }
    });
}

async function atualizarObra(id, dados) {
    return await prisma.acervo.update({
        where: { id: parseInt(id) },
        data: {
            titulo: dados.titulo,
            dataCriacao: dados.data ? new Date(dados.data) : null,
            descricao: dados.descricao || null,
            categoria: dados.categoria || null,
            idUsuario: parseInt(dados.idUsuario)
        }
    });
}

async function deletarObra(id) {
    return await prisma.acervo.delete({
        where: { id: parseInt(id) }
    });
}

export default {
    listarObras,
    listarObraPorId,
    criarObra,
    atualizarObra,
    deletarObra
};
