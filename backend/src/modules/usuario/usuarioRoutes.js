import express, { Router } from 'express'
import usuarioController from './usuarioController.js';

const router = Router();

router.get("/listar", usuarioController.listarUsuarios);

router.get("/listar/:id", usuarioController.listarUsuarioPorId);

router.post("/criar", usuarioController.criarUsuario);

router.put("/atualizar/:id", usuarioController.atualizarUsuario);

router.delete("/deletar/:id", usuarioController.deletarUsuario);

export default router;