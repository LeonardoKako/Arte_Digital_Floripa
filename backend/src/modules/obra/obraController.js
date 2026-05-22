async function listarObras(req, res, next) {
    return res.status(200).json([
        {
            id: 1,
            titulo: "Monalisa",
            data: "21/05/2026",
            autorId: 1
        },
        {
            id: 2,
            titulo: "O grito",
            data: "21/05/2026",
            autorId: 2
        }
    ]);
}

async function listarObraPorId(req, res, next) {
    return res.status(200).json({
        obra: {
            id: req.params.id,
            titulo: "Monalisa",
            data: "21/05/2026",
            autorId: 1
        }
    });
}

async function criarObra(req, res, next) {
    const obra = {
        id: 1,
        titulo: req.body.titulo,
        data: req.body.data,
        autorId: req.body.autorId
    };

    return res.status(201).json(obra);
}

async function atualizarObra(req, res, next) {
    const obra = {
        id: req.params.id,
        titulo: req.body.titulo,
        data: req.body.data,
        autorId: req.body.autorId
    };

    return res.status(200).json(obra);
}

async function deletarObra(req, res, next) {
    return res.sendStatus(204);
}

export default {
    listarObras,
    listarObraPorId,
    criarObra,
    atualizarObra,
    deletarObra
}