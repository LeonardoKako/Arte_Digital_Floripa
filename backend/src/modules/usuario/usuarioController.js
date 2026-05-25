import usuarioService from "./usuarioService.js";

async function listarUsuarios(req, res, next) { 
    try {
        const usuarios = await usuarioService.listarUsuarios();
        return res.status(200).json({
            sucesso: true,
            data: usuarios
        });
    } catch(error) {
        return next(error);
    }
    
}

async function listarUsuarioPorId(req, res, next) {
    try {
        const id = Number(req.params.id);
        const usuario = await usuarioService.listarUsuarioPorId(id);
        return res.status(200).json({
            sucesso: true,
            data: usuario
        });
    } catch(error) {
        return next(error);
    }   
}

async function criarUsuario(req, res, next) {
    try {
        const { nome, email, senha, tipoUsuario } = req.body;
        const usuarioBody = {
            nome,
            email, 
            senha,
            tipoUsuario
        };
        const usuarioCriado = await usuarioService.criarUsuario(usuarioBody);
        return res.status(201).json({
            sucesso: true,
            mensagem: "Usuário criado com sucesso",
            data: usuarioCriado
        });
    } catch(error) {
        return next(error);
    }    
}

async function atualizarUsuario(req, res, next) {
    try {
        const id = Number(req.params.id);
        const { nome, email, tipoUsuario } = req.body;
        const usuarioBody = {
            nome,
            email, 
            tipoUsuario
        };
        const usuarioAtualizado = await usuarioService.atualizarUsuario(id, usuarioBody);
        return res.status(200).json({
            sucesso: true,
            mensagem: "Usuário atualizado com sucesso",
            data: usuarioAtualizado
        });
    } catch(error) {
        return next(error);
    }
}

async function deletarUsuario(req, res, next) {
    try {
        const id = Number(req.params.id);
        await usuarioService.deletarUsuario(id);
        return res.status(204).end();
    } catch(error) {
        return next(error);
    }
    
}

export default {
    listarUsuarios,
    listarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
}

