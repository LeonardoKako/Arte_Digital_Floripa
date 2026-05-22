import express, { Router } from 'express'
import autorController from './autorController.js';

const router = Router();

router.get("/listar", autorController.listarAutores);

router.get("/listar/:id", autorController.listarAutorPorId);

router.post("/criar", autorController.criarAutor);

router.put("/atualizar/:id", autorController.atualizarAutor);

router.delete("/deletar/:id", autorController.deletarAutor);

export default router;