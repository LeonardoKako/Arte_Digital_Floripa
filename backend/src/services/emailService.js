// import nodemailer from 'nodemailer';
// import 'dotenv/config'

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

// async function enviarEmailBoasVindas(email, senhaTemporaria) {
//     await transporter.sendMail({
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Bem-vindo ao Arte Digital Floripa',
//         html: `
//             <h1>Olá, seja Bem-vindo!</h2>
//             <p>Sua conta foi criada na plataforma Arte Digital Floripa.</p>
//             <p><b>Email:</b> ${email}</p>
//             <p><b>Senha temporária:</b> ${senhaTemporaria}</p>
//             <p>Acesse o portal e altere sua senha após o primeiro login.</p>
//             <a href="${process.env.FRONTEND_URL}/login">Acessar o portal</a>
//         `
//     });
// }

// export default {
//     enviarEmailBoasVindas
// }