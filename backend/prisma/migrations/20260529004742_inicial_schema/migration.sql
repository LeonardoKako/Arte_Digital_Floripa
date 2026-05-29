-- CreateTable
CREATE TABLE "cadastro" (
    "id_cadastro" SERIAL NOT NULL,
    "tipo_usuario" VARCHAR(50) NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "data_cadastro" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cadastro_pkey" PRIMARY KEY ("id_cadastro")
);

-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "tipo_usuario" VARCHAR(50) NOT NULL,
    "id_cadastro" INTEGER NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "autor" (
    "id_autor" SERIAL NOT NULL,
    "nome_publico" VARCHAR(150) NOT NULL,
    "nacionalidade" VARCHAR(100),
    "data_nascimento" DATE,

    CONSTRAINT "autor_pkey" PRIMARY KEY ("id_autor")
);

-- CreateTable
CREATE TABLE "acervo" (
    "id_obra" SERIAL NOT NULL,
    "titulo" VARCHAR(200) NOT NULL,
    "data_criacao" DATE,
    "descricao" TEXT,
    "categoria" VARCHAR(100),

    CONSTRAINT "acervo_pkey" PRIMARY KEY ("id_obra")
);

-- CreateTable
CREATE TABLE "midia3d" (
    "id_midia3d" SERIAL NOT NULL,
    "nome_arquivo" VARCHAR(255) NOT NULL,
    "arquivo" BYTEA NOT NULL,
    "data_upload" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "id_obra" INTEGER NOT NULL,

    CONSTRAINT "midia3d_pkey" PRIMARY KEY ("id_midia3d")
);

-- CreateTable
CREATE TABLE "usuario_acervo" (
    "id_usuario" INTEGER NOT NULL,
    "id_obra" INTEGER NOT NULL,

    CONSTRAINT "usuario_acervo_pkey" PRIMARY KEY ("id_usuario","id_obra")
);

-- CreateTable
CREATE TABLE "autor_acervo" (
    "id_autor" INTEGER NOT NULL,
    "id_obra" INTEGER NOT NULL,

    CONSTRAINT "autor_acervo_pkey" PRIMARY KEY ("id_autor","id_obra")
);

-- CreateIndex
CREATE UNIQUE INDEX "cadastro_email_key" ON "cadastro"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuario_id_cadastro_key" ON "usuario"("id_cadastro");

-- AddForeignKey
ALTER TABLE "usuario" ADD CONSTRAINT "usuario_id_cadastro_fkey" FOREIGN KEY ("id_cadastro") REFERENCES "cadastro"("id_cadastro") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "midia3d" ADD CONSTRAINT "midia3d_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "acervo"("id_obra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_acervo" ADD CONSTRAINT "usuario_acervo_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "usuario_acervo" ADD CONSTRAINT "usuario_acervo_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "acervo"("id_obra") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autor_acervo" ADD CONSTRAINT "autor_acervo_id_autor_fkey" FOREIGN KEY ("id_autor") REFERENCES "autor"("id_autor") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "autor_acervo" ADD CONSTRAINT "autor_acervo_id_obra_fkey" FOREIGN KEY ("id_obra") REFERENCES "acervo"("id_obra") ON DELETE CASCADE ON UPDATE CASCADE;
