import express, { Router } from 'express'
import obraController from './obraController.js';

const router = Router();

router.get("/listar", obraController.listarObras);

router.get("/listar/:id", obraController.listarObraPorId);

router.post("/criar", obraController.criarObra);

router.put("/atualizar/:id", obraController.atualizarObra);

router.delete("/deletar/:id", obraController.deletarObra);

export default router;