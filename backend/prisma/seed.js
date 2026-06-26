import prisma from "../src/db/prisma.js"
import bcrypt from 'bcrypt';

async function main() {
    const hashSenha = await bcrypt.hash('Teste12345', 10);
    await prisma.cadastro.create({
        data: {
        tipo_usuario: 'admin',
        nome: 'Administrador',
        email: 'admin@artedigital.com.br',
        senha: hashSenha,
        usuario: {
            create: { tipo_usuario: 'admin' },
        },
        },
    })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })