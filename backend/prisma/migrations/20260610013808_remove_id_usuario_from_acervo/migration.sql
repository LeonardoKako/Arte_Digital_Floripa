/*
  Warnings:

  - You are about to drop the column `id_usuario` on the `acervo` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "acervo" DROP CONSTRAINT "acervo_id_usuario_fkey";

-- AlterTable
ALTER TABLE "acervo" DROP COLUMN "id_usuario";
