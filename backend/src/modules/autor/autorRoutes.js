import express, { Router } from 'express'
import autorController from './autorController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

/**
 * @swagger
 * /autores/listar:
 *   get:
 *     summary: Listar todos os autores
 *     tags: [Autores]
 *     responses:
 *       200:
 *         description: Lista de autores retornada com sucesso
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
 *                     $ref: '#/components/schemas/Autor'
 */
router.get("/listar", autorController.listarAutores);

/**
 * @swagger
 * /autores/listar/{id}:
 *   get:
 *     summary: Buscar autor por ID
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do autor
 *     responses:
 *       200:
 *         description: Autor encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sucesso:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Autor'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/listar/:id", autorController.listarAutorPorId);

/**
 * @swagger
 * /autores/criar:
 *   post:
 *     summary: Criar novo autor
 *     tags: [Autores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_publico
 *             properties:
 *               nome_publico:
 *                 type: string
 *                 example: "João Silva"
 *               nacionalidade:
 *                 type: string
 *                 example: "Brasileiro"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       201:
 *         description: Autor criado com sucesso
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
 *                   example: "Autor criado com sucesso."
 *                 data:
 *                   $ref: '#/components/schemas/Autor'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/criar", authMiddleware, autorController.criarAutor);

/**
 * @swagger
 * /autores/atualizar/{id}:
 *   put:
 *     summary: Atualizar autor
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do autor
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome_publico:
 *                 type: string
 *                 example: "João Silva Atualizado"
 *               nacionalidade:
 *                 type: string
 *                 example: "Brasileiro"
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: "1990-01-01"
 *     responses:
 *       200:
 *         description: Autor atualizado com sucesso
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
 *                   example: "Autor atualizado com sucesso."
 *                 data:
 *                   $ref: '#/components/schemas/Autor'
 *       404:
 *         description: Autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.put("/atualizar/:id", authMiddleware, autorController.atualizarAutor);

/**
 * @swagger
 * /autores/deletar/{id}:
 *   delete:
 *     summary: Deletar autor
 *     tags: [Autores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do autor
 *     responses:
 *       204:
 *         description: Autor deletado com sucesso (sem conteúdo)
 *       404:
 *         description: Autor não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete("/deletar/:id", authMiddleware, autorController.deletarAutor);

export default router;
