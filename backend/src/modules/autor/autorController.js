async function listarAutores(req, res, next) {
    return res.status(200).json([
        {
            id: 1,
            nome: "Pablo Picasso",
            nacionalidade: "Espanhol"
        },
        {
            id: 2,
            nome: "Van gogh",
            nacionalidade: "Holândes"
        }
    ]);
}

async function listarAutorPorId(req, res, next) {
    return res.status(200).json({
        autor: {
            id: req.params.id,
            nome: "Pablo Picasso",
            nacionalidade: "Espanhol"
        }
    });
}

async function criarAutor(req, res, next) {
    const autor = {
        id: 1,
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade
    };

    return res.status(201).json(autor);
}

async function atualizarAutor(req, res, next) {
    const autor = {
        id: req.params.id,
        nome: req.body.nome,
        nacionalidade: req.body.nacionalidade
    };

    return res.status(200).json(autor);
}

async function deletarAutor(req, res, next) {
    return res.sendStatus(204);
}

export default {
    listarAutores,
    listarAutorPorId,
    criarAutor,
    atualizarAutor,
    deletarAutor
}