import express, { Router } from 'express'
import authController from './authController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.post("/login", authController.login);
router.post("/registro", authMiddleware, authController.cadastrarUsuario);
// router.patch("/senha", authMiddleware, authController.alterarSenha);
router.get("/me", authMiddleware, authController.me);

export default router;