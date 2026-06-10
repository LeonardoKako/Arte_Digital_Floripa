import express, { Router } from 'express'
import obraController from './obraController.js';

const router = Router();

/**
 * @swagger
 * /obras/listar:
 *   get:
 *     summary: Listar todas as obras
 *     tags: [Obras]
 *     parameters:
 *       - in: query
 *         name: categoria
 *         schema:
 *           type: string
 *         description: Filtrar por categoria
 *       - in: query
 *         name: autor
 *         schema:
 *           type: string
 *         description: Filtrar por nome público do autor
 *     responses:
 *       200:
 *         description: Lista de obras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_obra:
 *                     type: integer
 *                   titulo:
 *                     type: string
 *                   categoria:
 *                     type: string
 *                   midia3d:
 *                     type: array
 *                     items:
 *                       type: object
 *                   autor_acervo:
 *                     type: array
 *                     items:
 *                       type: object
 */
router.get("/listar", obraController.listarObras);

/**
 * @swagger
 * /obras/listar/{id}:
 *   get:
 *     summary: Buscar obra por ID
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     responses:
 *       200:
 *         description: Obra encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 obra:
 *                   type: object
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.get("/listar/:id", obraController.listarObraPorId);

/**
 * @swagger
 * /obras/criar:
 *   post:
 *     summary: Criar nova obra
 *     tags: [Obras]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               idUsuario:
 *                 type: integer
 *               midias3d:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nome_arquivo:
 *                       type: string
 *                     arquivo:
 *                       type: string
 *               usuariosIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               autoresIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Obra criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.post("/criar", obraController.criarObra);

/**
 * @swagger
 * /obras/atualizar/{id}:
 *   put:
 *     summary: Atualizar obra
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               data:
 *                 type: string
 *                 format: date
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *               idUsuario:
 *                 type: integer
 *               midias3d:
 *                 type: array
 *                 items:
 *                   type: object
 *               usuariosIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *               autoresIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Obra atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.put("/atualizar/:id", obraController.atualizarObra);

/**
 * @swagger
 * /obras/deletar/{id}:
 *   delete:
 *     summary: Deletar obra
 *     tags: [Obras]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico da obra
 *     responses:
 *       204:
 *         description: Obra deletada com sucesso (sem conteúdo)
 *       404:
 *         description: Obra não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 */
router.delete("/deletar/:id", obraController.deletarObra);

export default router;
