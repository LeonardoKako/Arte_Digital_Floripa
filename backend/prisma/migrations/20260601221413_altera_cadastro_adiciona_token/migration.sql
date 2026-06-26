-- AlterTable
ALTER TABLE "cadastro" ADD COLUMN     "token_expiracao" TIMESTAMP(6),
ADD COLUMN     "token_temporario" VARCHAR(255),
ALTER COLUMN "tipo_usuario" DROP NOT NULL,
ALTER COLUMN "nome" DROP NOT NULL,
ALTER COLUMN "senha" DROP NOT NULL;

-- AlterTable
ALTER TABLE "usuario" ALTER COLUMN "tipo_usuario" DROP NOT NULL;
