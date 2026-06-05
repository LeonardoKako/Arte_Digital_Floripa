import express, { Router } from 'express'
import authController from './authController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     description: Autentica o usuário e retorna um token JWT válido por 1 dia.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               senha:
 *                 type: string
 *                 example: "Senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Dados de login inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Credenciais inválidas"
 *       401:
 *         description: Email ou senha incorretos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Credenciais inválidas"
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/completar-cadastro/{token}:
 *   post:
 *     summary: Completar cadastro
 *     description: >
 *       Finaliza o cadastro do usuário usando o token recebido por email.
 *       O token é válido por 24 horas. O usuário define nome e senha nesta etapa.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "a3f1c2d4e5b6..."
 *         description: Token temporário recebido por email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Silva"
 *               senha:
 *                 type: string
 *                 description: "Mínimo 8 caracteres, uma maiúscula, uma minúscula, um número. Sem espaços."
 *                 example: "Senha123"
 *     responses:
 *       201:
 *         description: Cadastro concluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: "Cadastro realizado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos (nome/senha vazios ou senha fraca)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número. Espaços não são permitidos"
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Token inválido ou expirado!"
 */
router.post("/completar-cadastro/:token", authController.completarCadastro);

/**
 * @swagger
 * /auth/recuperar-senha:
 *   post:
 *     summary: Solicitar recuperação de senha
 *     description: >
 *       Envia um email com instruções para redefinir a senha, se o email estiver cadastrado.
 *       Por segurança, a resposta é sempre a mesma independente de o email existir ou não.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *     responses:
 *       200:
 *         description: Solicitação processada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: "Se este email estiver cadastrado, você receberá as instruções em breve."
 *       400:
 *         description: Email inválido ou formato incorreto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Formato do email inválido"
 */
router.post("/recuperar-senha", authController.recuperarSenha);

/**
 * @swagger
 * /auth/redefinir-senha/{token}:
 *   post:
 *     summary: Redefinir senha
 *     description: >
 *       Define uma nova senha usando o token recebido por email via recuperação de senha.
 *       O token é válido por 24 horas.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *           example: "a3f1c2d4e5b6..."
 *         description: Token recebido por email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - senha
 *             properties:
 *               senha:
 *                 type: string
 *                 description: "Mínimo 8 caracteres, uma maiúscula, uma minúscula, um número. Sem espaços."
 *                 example: "NovaSenha123"
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   example: "Senha redefinida com sucesso."
 *       400:
 *         description: Senha inválida ou fraca
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Senha deve ter no mínimo 8 caracteres, uma letra maiúscula, uma minúscula e um número. Espaços não são permitidos"
 *       401:
 *         description: Token inválido ou expirado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Token inválido ou expirado."
 */
router.post("/redefinir-senha/:token", authController.redefinirSenha);

// router.patch("/senha", authMiddleware, authController.alterarSenha);

/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Dados do usuário autenticado
 *     description: Retorna os dados do usuário logado com base no token JWT.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados retornados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 usuario:
 *                   $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado — token ausente ou inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/me", authMiddleware, authController.me);

export default router;