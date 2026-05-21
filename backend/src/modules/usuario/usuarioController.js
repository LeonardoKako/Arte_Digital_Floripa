async function listarUsuarios(req, res, next) {
    return res.status(200).json([
        {
            id: 1,
            nome: "João",
            email: "joao@gmail.com"
        },
        {
            id: 2,
            nome: "Maria",
            email: "maria@gmail.com"
        }
    ]);
}

async function listarUsuarioPorId(req, res, next) {
    return res.status(200).json({
        usuario: {
            id: req.params.id,
            nome: "João"
        }
    });
}

async function criarUsuario(req, res, next) {
    const user = {
        id: 1, 
        nome: req.body.nome,
        email: req.body.email
    };

    return res.status(201).json(user);
}

async function atualizarUsuario(req, res, next) {
    const user = {
        id: req.params.id,
        nome: req.body.nome,
        email: req.body.email
    };

    return res.status(200).json(user);
}

async function deletarUsuario(req, res, next) {
    return res.sendStatus(204);
}

export default {
    listarUsuarios,
    listarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
}

