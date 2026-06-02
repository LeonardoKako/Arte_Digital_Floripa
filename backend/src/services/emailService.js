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

async function enviarEmailRecuperarSenha(email, token) {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Recuperação de senha',
        html: `
            <h1>Recuperação de senha</h1>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta na plataforma Arte Digital Floripa.</p>
            <p><b>Email:</b> ${email}</p>
            <p>Clique no link abaixo para criar uma nova senha:</p>
            <a href="${process.env.FRONTEND_URL}/recuperar-senha?token=${token}">Redefinir minha senha</a>
            <p>Este link expira em 24 horas. Se você não solicitou a recuperação de senha, ignore este email.</p>
        `
    })
}

export default {
    enviarEmailBoasVindas,
    enviarEmailRecuperarSenha
}