import nodemailer from 'nodemailer';
import 'dotenv/config'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

async function enviarEmailBoasVindas(email, token) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Bem-vindo ao Arte Digital Floripa',
        html: `
            <h1>Olá, seja bem-vindo!</h1>
            <p>Sua conta foi criada na plataforma Arte Digital Floripa.</p>
            <p><b>Email:</b> ${email}</p>
            <p>Para acessar o portal, clique no botão abaixo e crie sua senha:</p>
            <a href="${process.env.FRONTEND_URL}/completar-cadastro?token=${token}">Criar minha senha</a>
        `
    });
}

export default {
    enviarEmailBoasVindas
}