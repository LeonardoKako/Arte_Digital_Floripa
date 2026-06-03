import React from "react";
import { Link } from "react-router-dom";
import "./Cadastro.css";

function Cadastro() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 id="titulo">Criar Conta</h1>
        <p id="sub_titulo" className="">Preencha os dados abaixo</p>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Nome Completo"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Senha"
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmar_senha"
              placeholder="Confirmar Senha"
            />
          </div>
          <button id="enviar_btn" type="submit" className="btn">
            Enviar
          </button>
        </form>
        <p id="login_p">Já tem uma conta? <Link id="login_link" to="/login">Fazer Login</Link></p>
      </div>
    </>
  );
}

export default Cadastro;
