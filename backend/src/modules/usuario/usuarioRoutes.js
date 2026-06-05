import express, { Router } from 'express'
import usuarioController from './usuarioController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /usuarios/listar:
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/listar", authMiddleware, usuarioController.listarUsuarios);

/**
 * @swagger
 * /usuarios/listar/{id}:
 *   get:
 *     summary: Buscar usuário por ID
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID numérico do usuário
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Id inválido"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Usuário não encontrado"
 */
router.get("/listar/:id", authMiddleware, usuarioController.listarUsuarioPorId);

/**
 * @swagger
 * /usuarios/cadastro:
 *   post:
 *     summary: Cadastrar novo usuário apenas com email
 *     description: Cria um novo usuário e envia um email com token de acesso (válido por 24h).
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
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
 *                 example: "novo@email.com"
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
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
 *                   example: "Usuário cadastrado com sucesso! Um email foi enviado com as instruções de acesso."
 *       400:
 *         description: Dados inválidos (email vazio, formato incorreto, etc.)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Email não é válido"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       409:
 *         description: Email já cadastrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Esse email já está cadastrado!"
 */
router.post("/cadastro", authMiddleware, usuarioController.cadastrarUsuario);

/**
 * @swagger
 * /usuarios/atualizar/{id}:
 *   patch:
 *     summary: Atualizar usuário
 *     description: Atualiza parcialmente os dados. Ao menos um campo deve ser enviado.
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID numérico do usuário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: "João Atualizado"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "novo@email.com"
 *               tipoUsuario:
 *                 type: string
 *                 example: "moderador"
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
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
 *                   example: "Usuário atualizado com sucesso"
 *                 data:
 *                   $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos ou nenhum campo enviado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Nenhum campo para atualizar foi enviado!"
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       409:
 *         description: Email já pertence a outro usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Esse email já está cadastrado!"
 */
router.patch("/atualizar/:id", authMiddleware, usuarioController.atualizarUsuario);

/**
 * @swagger
 * /usuarios/deletar/{id}:
 *   delete:
 *     summary: Deletar usuário
 *     description: Remove permanentemente um usuário pelo ID.
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: ID numérico do usuário
 *     responses:
 *       204:
 *         description: Usuário deletado com sucesso (sem conteúdo)
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Id não é um número."
 *       401:
 *         description: Não autorizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Usuário não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *             example:
 *               sucesso: false
 *               mensagem: "Usuário não encontrado"
 */
router.delete("/deletar/:id", authMiddleware, usuarioController.deletarUsuario);

export default router;