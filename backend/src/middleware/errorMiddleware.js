import { Prisma } from '@prisma/client';
// Mapeamento centralizado de mensagens de erro → status HTTP
// Services apenas jogam new Error("mensagem"), o middleware traduz automaticamente
const mapeamentoErrosNegocio = {
    "Id inválido": 400,
    "É necessário cadastrar um nome!": 400,
    "Autor nao encontrado.": 404,
    "Usuário não encontrado": 404,
    "Registro não encontrado.": 404,
    "Credenciais inválidas": 401,
    "Token inválido ou expirado.": 401,
    "Senha atual incorreta": 401,
    "Não autorizado!": 401
};

export const errorMiddleware = (err, req, res, next) => {
    // O código chamará essa função sempre que o controller chamar 'next(erro)', ocorrer um erro no authMiddleware, ocorrer um erro de formatação no JSON, ocorrer um erro não capturado em outro local.

    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Trata o erro de sintaxe JS no body dos JSON.

        return res.status(400).json({
            sucesso: false,
            mensagem: "Erro de sintaxe. JSON inválido no corpo de requisição."
        });
    }

    if (err instanceof Prisma.PrismaClientValidationError) {
        return res.status(400).json({
            sucesso: false,
            mensagem: "Dados inválidos enviados ao servidor.",
            detalhe: err.message
        });
    }

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        // Tratamento de erros comuns com base em códigos do Prisma (P2002, P P2025 e P2014).
        switch (err.code) {
            case 'P2002':
                // Violação de alguma constraint única, como o e-mail.
                return res.status(409).json({
                    sucesso: false,
                    mensagem: "Erro. Este registro já existe.",
                    detalhe: err.meta
                });
            case 'P2025':
                // Conteúdo não encontrado 'Not Found'.
                return res.status(404).json({
                    sucesso: false,
                    mensagem: "Registro não encontrado.",
                    detalhe: err.meta
                });

            case 'P2003':
                // Tentar conectar algo cujo ID não existe.
                return res.status(400).json({
                    sucesso: false,
                    mensagem: 'Falha na chave estrangeira. Registro relacionado não existe.',
                    detalhe: err.meta
                });

            case 'P2014':
                // Violação de alguma relação de dados
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "Violação de restrição no Banco de Dados.",
                    detalhe: err.meta
                });

            default:
                // Tratamento padrão para demais erros não enquadrados acima.
                return res.status(500).json({
                    sucesso: false,
                    mensagem: "Erro interno no Banco de Dados."
                });
        }
    }

    // Tratamento de erros de autenticação (JWT inválido ou expirado).
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token inválido."
        });
    }

    if (err.name === 'TokenExpiredError') {
        return res.status(401).json({
            sucesso: false,
            mensagem: "Token expirado. Faça Login novamente."
        });
    }

    // Caso o erro não se enquadre em nenhuma condição acima, ele cai aqui.

    const statusCode = err.statusCode
        ? err.statusCode
        : mapeamentoErrosNegocio[err.message]
            ? mapeamentoErrosNegocio[err.message]
            : 500;

    if (process.env.NODE_ENV === 'production') {

        return res.status(statusCode).json({
            sucesso: false,
            mensagem: err.message || "Erro interno no servidor."
        });
    }

    // Caso não esteja em produção, executa-se este bloco para debug.
    res.status(statusCode).json({
        sucesso: false,
        mensagem: err.message,
        stack: err.stack,
        erro: err
    });
};