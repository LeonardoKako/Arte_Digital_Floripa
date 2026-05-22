async function login(req, res, next) {
    const response = {
        token: "mock-token-123",
        usuario: {
            id: 1,
            nome: "João",
            email: req.body.email
        }
    };

    return res.status(200).json(response);
}

async function me(req, res, next) {
    return res.status(200).json({
        usuario: {
            id: 1,
            nome: "João",
            email: "joao@gmail.com"
        }
    });
}

export default {
    login,
    me
}