# 📸 Arte Digital Floripa - Guia do Repositório (Branch Development)

Este é o repositório centralizado do projeto **Arte Digital Floripa**, contendo o **Backend**, a **Landing Page pública** e a **Gerência Administrativa**. 

Abaixo, você encontrará o resumo de tudo o que foi refatorado/redesenhado e o passo a passo para rodar o projeto localmente.

---

## 🛠️ O que foi feito (Melhorias e Redesign)

### 1. 🌐 Landing Page Pública (`landing-page`)
*   **Apresentação Independente (Mock Data)**: Migramos a listagem e os detalhes das obras para consumirem dados locais ricos de exemplo (`src/data/mockObras.js`). Isso garante que a landing page pública possa ser apresentada instantaneamente sem depender do status do banco de dados local.
*   **Redesign Premium**:
    *   **Hero**: Fundo escuro luxuoso com gradiente e tipografia inspirada em galerias e museus de arte.
    *   **Filtros de Categoria**: Filtros reformatados em botões estilo pílula modernos com transição ativa/inativa.
    *   **Cards de Obras**: Adicionado efeito de zoom suave ao passar o mouse e elevação com sombra 3D.
    *   **Detalhes da Obra**: Layout limpo de especificações técnicas (Ano e Técnica) e blocos com bordas arredondadas e sombras suaves.

### 2. 🛡️ Painel de Gerência (`gerencia_front`)
*   **Redesign Responsivo**:
    *   As telas de **Login**, **Cadastro** e **Esqueci Senha** foram convertidas para contêineres de cards flutuantes centralizados, garantindo que não quebrem em telas menores.
    *   **Tabela de Obras**: Estilização refinada com cabeçalho escuro, linhas com hover suave e miniaturas de imagens recortadas proporcionalmente com bordas arredondadas.
    *   **Formulários e Filtros**: Campos de texto e filtros administrativos ajustados com cantos arredondados, focos elegantes e organização limpa.
*   **Correções de Código**:
    *   Remoção de `<ToastContainer />` duplicados nas páginas internas (centralizado no `App.jsx`).
    *   Correção de bug de estado assíncrono ao resgatar o usuário logado (`/auth/me`), que causava o erro *"Usuário logado não identificado"* na hora de salvar obras.
    *   Adicionada verificação no ano de criação para evitar que a página trave se a obra no banco de dados estiver com a data nula.

### 3. 🖥️ Backend (`backend`)
*   **Correção de Chave Estrangeira**: O frontend envia `usuariosIds` contendo o `id_cadastro`. O backend foi corrigido para buscar o `id_usuario` correspondente a esse cadastro e fazer a vinculação correta da obra no banco de dados, eliminando o erro de validação.
*   **Auto-Seed de Autores**: Se o banco de dados local estiver vazio, o backend agora cria e associa automaticamente o autor padrão *"Franklin Cascaes"* ao salvar uma obra para evitar falhas de restrição de integridade.

---

## 🚀 Como Rodar o Projeto Localmente

### 1. Requisitos Prévios
*   [Node.js](https://nodejs.org/) instalado.
*   Banco de dados **PostgreSQL** rodando localmente.

---

### 2. Passo 1: Configurar e Iniciar o Backend
1. Navegue até a pasta `backend`.
2. Renomeie o arquivo `.env.example` para `.env` e ajuste a string de conexão com o seu banco PostgreSQL:
   ```env
   DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/NOME_DO_BANCO"
   JWT_PASSWORD="sua_senha_jwt_aqui"
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Sincronize e gere as tabelas do banco de dados usando o Prisma:
   ```bash
   npx prisma db push
   ```
5. Inicie o servidor em modo de desenvolvimento:
   ```bash
   npm run dev
   ```
   *O backend rodará na porta `3000` (http://localhost:3000).*

---

### 3. Passo 2: Iniciar a Landing Page Pública
1. Navegue até a pasta `landing-page`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm run dev
   ```
   *A landing page rodará no endereço gerado pelo Vite (geralmente http://localhost:5173).*

---

### 4. Passo 3: Iniciar o Painel de Gerência
1. Navegue até a pasta `gerencia_front`.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie a aplicação:
   ```bash
   npm run dev
   ```
   *O painel administrativo rodará no endereço gerado pelo Vite (geralmente http://localhost:5173 ou posterior).*

---

_Projeto desenvolvido para fins acadêmicos - Unicesusc - 2026_
