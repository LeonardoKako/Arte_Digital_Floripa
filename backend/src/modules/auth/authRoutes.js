import express, { Router } from 'express'
import authController from './authController.js';
import { authMiddleware } from '../../middleware/authMiddleware.js';

const router = Router();

router.post("/login", authController.login);
router.post("/completar-cadastro/:token", authController.completarCadastro);
router.post("/recuperar-senha", authController.recuperarSenha);
router.post("/redefinir-senha/:token", authController.redefinirSenha);
// router.patch("/senha", authMiddleware, authController.alterarSenha);
router.get("/me", authMiddleware, authController.me);

export default router;