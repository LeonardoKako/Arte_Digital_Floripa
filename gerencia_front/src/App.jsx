import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";

// paginas

import Login from "./pages/Login/Login";
import Cadastro from "./pages/Cadastro/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha/EsqueciSenha";
import NovaObra from "./pages/NovaObra/NovaObra";
import Layout from "./Layout";

// proteção de rotas

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectedRoute />}>
              <Route index element={<NovaObra />} />
            </Route>
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/completar-cadastro" element={<Cadastro />} />
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />

          {/* rotas privadas - somente com o token jwt */}
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
