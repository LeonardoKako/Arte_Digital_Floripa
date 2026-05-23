import usuarioService from "./usuarioService.js";

async function listarUsuarios(req, res, next) {  
    const usuarios = await usuarioService.listarUsuarios();
    return res.status(200).json({
        sucesso: true,
        data: usuarios
    });
}

async function listarUsuarioPorId(req, res, next) {
    const id = Number(req.params.id);
    const usuario = await usuarioService.listarUsuarioPorId(id);
    return res.status(200).json({
        sucesso: true,
        data: usuario
    });
}

async function criarUsuario(req, res, next) {
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
}

async function atualizarUsuario(req, res, next) {
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
}

async function deletarUsuario(req, res, next) {
    const id = Number(req.params.id);
    await usuarioService.deletarUsuario(id);
    return res.status(204).end();
}

export default {
    listarUsuarios,
    listarUsuarioPorId,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario
}

