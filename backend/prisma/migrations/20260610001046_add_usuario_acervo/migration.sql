-- AlterTable
ALTER TABLE "acervo" ADD COLUMN     "id_usuario" INTEGER;

-- AddForeignKey
ALTER TABLE "acervo" ADD CONSTRAINT "acervo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;
