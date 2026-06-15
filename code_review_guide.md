# Guia de Melhorias e Boas Práticas - Landing Page

Fala, time! Tudo bem? 

Como o projeto está crescendo, preparamos este guia com algumas sugestões de organização e boas práticas de arquitetura React. Essas mudanças vão te ajudar a manter o código muito mais limpo, fácil de dar manutenção e simples de achar os arquivos quando o projeto ficar maior.

Não se preocupe, explicamos o **motivo** de cada mudança e trazemos exemplos práticos de como fazer!

---

## 📂 1. Organização da Pasta de Componentes (Global vs. Local)

### 📌 O problema atual
Hoje, a pasta `src/components` está guardando todos os componentes do projeto. Porém, alguns componentes são usados **em apenas uma página específica**.
*   O componente `LinhaObra` é usado apenas dentro da página `NovaObra`.
*   O componente `ObrasContainer` e o `Hero` são usados apenas na página `Home`.

Quando deixamos tudo em `src/components`, a pasta fica lotada e quem lê o código acha que qualquer um desses componentes pode ser usado em qualquer lugar do site.

### 💡 A Solução (Melhor Prática)
Separar o que é **Global** (usado em várias páginas) do que é **Local** (usado em apenas uma página específica).

*   **Componentes Globais (ficam em `src/components/`):** Apenas coisas genéricas como `Navbar`, `Footer`, botões ou inputs customizados.
*   **Componentes Locais (ficam dentro da própria pasta da página):**
    ```text
    src/
    └── pages/
        ├── NovaObra/
        │   ├── components/
        │   │   └── LinhaObra/           <-- Agora ele fica aqui dentro!
        │   │       ├── LinhaObra.jsx
        │   │       └── LinhaObra.css
        │   ├── NovaObra.jsx
        │   └── NovaObra.css
        └── Home/
            ├── components/
            │   ├── Hero/
            │   └── ObrasContainer/
            ├── Home.jsx
            └── Home.css
    ```

---

## 🛣️ 2. Centralização de Rotas e Rota Protegida (Protected Route)

### 📌 O problema atual
As rotas estão configuradas diretamente no arquivo `App.jsx`. Conforme você for criando mais páginas, o `App.jsx` vai ficar gigante e difícil de ler. 

Além disso, rotas administrativas (como a página `/novaObra`) precisam de proteção para que usuários não logados não consigam acessá-las.

### 💡 A Solução (Melhor Prática)
1. **Criar um arquivo dedicado para as rotas** (ex: `src/routes.jsx`).
2. **Implementar uma Rota Protegida (ProtectedRoute)** que verifica se existe um token JWT antes de dar acesso.

#### Passo 1: Criar o componente de Rota Protegida (`src/components/ProtectedRoute.jsx`)
Como você já salva o token JWT no `localStorage` ou `sessionStorage`, podemos ler esse token para saber se o usuário está logado:

```jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  // Busca o token do JWT igual você faz no arquivo api.js
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Se NÃO houver token, redireciona o usuário para a tela de Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se houver token, renderiza a página que o usuário tentou acessar
  return <Outlet />;
}

export default ProtectedRoute;
```

#### Passo 2: Atualizar o arquivo de rotas (`src/App.jsx` ou um novo `src/routes.jsx`)
Agora, basta envelopar as páginas que precisam de login usando o `<ProtectedRoute />`:

```jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Obras from "./pages/Obras/Obras";
import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha/EsqueciSenha";
import NovaObra from "./pages/NovaObra/NovaObra";
import ProtectedRoute from "./components/ProtectedRoute"; // Importa a proteção

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ROTAS PÚBLICAS (Qualquer um acessa) */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/obras/:id" element={<Obras />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/completar-cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />

        {/* ROTAS PRIVADAS (Precisa estar logado para acessar) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/novaObra" element={<NovaObra />} />
          {/* Adicione outras páginas protegidas aqui dentro no futuro */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

---

## 🧹 3. Limpeza de Pequenas Redundâncias

Aqui estão três pontos rápidos de resolver que vão deixar a aplicação rodando mais leve e evitar pequenos bugs visuais:

### A. Centralizar o `ToastContainer`
*   **O que está acontecendo:** O `<ToastContainer />` do `react-toastify` está declarado em três arquivos diferentes (`Home.jsx`, `Obras.jsx`, `ObrasContainer.jsx`).
*   **Por que mudar:** Isso pode fazer com que notificações apareçam duplicadas ou fiquem por cima umas das outras.
*   **Como resolver:** Remova o `<ToastContainer />` de dentro dessas páginas e coloque ele **apenas uma vez** dentro do `Layout.jsx` (ou em `App.jsx`), logo abaixo das rotas. O React-Toastify passará a funcionar no site inteiro automaticamente!

### B. Remover imports redundantes de CSS do Bootstrap
*   **O que está acontecendo:** O import `import "bootstrap/dist/css/bootstrap.min.css";` está presente no topo de páginas como `Obras.jsx` e `Home.jsx`.
*   **Como resolver:** Você já importou o CSS e o JS do Bootstrap globalmente no seu `main.jsx`. Portanto, você pode apagar com segurança essas linhas extras de import nas outras páginas. Isso deixa o código mais limpo.

### C. Mover variáveis estáticas para fora do ciclo de renderização
*   **Onde:** No arquivo `NovaObra.jsx`, a lista de `obras` (linhas de 7 a 48) está declarada dentro do componente.
*   **Por que mudar:** Sempre que o componente React atualiza (re-renderiza), ele recria essa lista inteira na memória do navegador.
*   **Como resolver:** Basta mover o bloco `var obras = [...]` para fora da função `NovaObra() { ... }` (coloque antes da linha da função). Assim, ela é criada apenas uma vez quando a página carrega.
