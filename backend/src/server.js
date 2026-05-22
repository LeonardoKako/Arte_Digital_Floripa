import express from 'express';
import usuarioRoutes from './modules/usuario/usuarioRoutes.js';
import autorRoutes from './modules/autor/autorRoutes.js';
import obraRoutes from './modules/obra/obraRoutes.js';
import authRoutes from './modules/auth/authRoutes.js';

const app = express();
const port = 3000;
app.use(express.json());


app.use("/usuarios", usuarioRoutes);
app.use("/autores", autorRoutes);
app.use("/obras", obraRoutes);
app.use("/auth", authRoutes);

app.listen(port);