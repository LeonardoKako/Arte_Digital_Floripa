import 'dotenv/config'
import cors from 'cors';
import express from 'express';
import usuarioRoutes from './modules/usuario/usuarioRoutes.js';
import autorRoutes from './modules/autor/autorRoutes.js';
import obraRoutes from './modules/obra/obraRoutes.js';
import authRoutes from './modules/auth/authRoutes.js';
import { swaggerUi, swaggerSpec } from './config/swagger.js';

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/usuarios", usuarioRoutes);
app.use("/autores", autorRoutes);
app.use("/obras", obraRoutes);
app.use("/auth", authRoutes);

app.listen(port);