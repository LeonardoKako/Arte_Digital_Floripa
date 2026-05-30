import express, { Router } from 'express'
import usuarioController from './usuarioController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.get("/listar", authMiddleware, usuarioController.listarUsuarios);

router.get("/listar/:id", authMiddleware, usuarioController.listarUsuarioPorId);

router.patch("/atualizar/:id", authMiddleware, usuarioController.atualizarUsuario);

router.delete("/deletar/:id", authMiddleware, usuarioController.deletarUsuario);

export default router;