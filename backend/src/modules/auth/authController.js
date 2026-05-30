import authService from "./authService.js";

async function login(req, res, next) {
    try {
        const { email, senha } = req.body;

        const loginBody = {
            email,
            senha
        };
        
        const loginResponse = await authService.login(loginBody);

        return res.status(200).json({
            sucesso: true,
            ...loginResponse
        });
    } catch(error){
        throw new Error("Erro: " + error);
    }   
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
        sucesso: true,
        usuario: req.usuario
    });
}

export default {
    login,
    cadastrarUsuario,
    me
}