import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";

// paginas 

import Home from "./pages/Home/Home";
import Obras from "./pages/Obras/Obras";
import Login from "./pages/Login/Login"
import Cadastro from "./pages/Cadastro/Cadastro";
import EsqueciSenha from "./pages/EsqueciSenha/EsqueciSenha";
import NovaObra from "./pages/NovaObra/NovaObra";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/obras/:id" element={<Obras />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/esqueci-senha" element={<EsqueciSenha />} />
        <Route path="/novaObra" element={<NovaObra />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
