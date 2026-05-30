import authService from "./authService.js";

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

async function cadastrarUsuario(req, res, next) {
    try {
        const { nome, email, senha, tipoUsuario } = req.body;
        const registroBody = {
            nome,
            email, 
            senha,
            tipoUsuario
        };
        const registro = await authService.cadastrarUsuario(registroBody);
        return res.status(201).json({
            sucesso: true,
            mensagem: "Usuário criado com sucesso",
            data: registro
        });
    } catch(error) {
        return next(error);
    }    
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
    cadastrarUsuario,
    me
}