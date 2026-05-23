import obraService from './obraService.js';

async function listarObras(req, res, next) {
    try {
        const obras = await obraService.listarObras();
        return res.status(200).json(obras);
    } catch (error) {
        next(error);
    }
}

async function listarObraPorId(req, res, next) {
    try {
        const obra = await obraService.listarObraPorId(req.params.id);

        if (!obra) {
            return res.status(404).json({ error: 'Obra não encontrada' });
        }

        return res.status(200).json({ obra });
    } catch (error) {
        next(error);
    }
}

async function criarObra(req, res, next) {
    try {
        const novaObra = await obraService.criarObra(req.body);
        return res.status(201).json(novaObra);
    } catch (error) {
        next(error);
    }
}

async function atualizarObra(req, res, next) {
    try {
        const obraAtualizada = await obraService.atualizarObra(req.params.id, req.body);
        return res.status(200).json(obraAtualizada);
    } catch (error) {
        next(error);
    }
}

async function deletarObra(req, res, next) {
    try {
        await obraService.deletarObra(req.params.id);
        return res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

export default {
    listarObras,
    listarObraPorId,
    criarObra,
    atualizarObra,
    deletarObra
};
