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

async function completarCadastro(req, res, next) {
    try {
        const token = req.params.token;

        const { nome, senha } = req.body;
        const cadastroBody = {
            nome,
            senha
        }

        const cadastroCompleto = await authService.completarCadastro(token, cadastroBody);

        return res.status(201).json({
            sucesso: true,
            mensagem: "Cadastro realizado com sucesso",
            data: cadastroCompleto
        });
    } catch(error) {
        return next(error);
    }
}

// async function alterarSenha(req, res, next) {
//     try {
//         const { senhaAtual, senhaNova } = req.body;

//         await authService.alterarSenha(req.usuario.id_cadastro, senhaAtual, senhaNova);
//         return res.status(200).json({
//             sucesso: true,
//             mensagem: "Senha alterada com sucesso"
//         });
//     } catch(error) {
//         throw new Error("Error: " + error);
//     }
// }

async function me(req, res, next) {
    return res.status(200).json({
        sucesso: true,
        usuario: req.usuario
    });
}

export default {
    login,
    completarCadastro,
    // alterarSenha,
    me
}