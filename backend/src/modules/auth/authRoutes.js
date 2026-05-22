import express, { Router } from 'express'
import authController from './authController.js';

const router = Router();

router.post("/login", authController.login);

router.get("/me", authController.me);

export default router;