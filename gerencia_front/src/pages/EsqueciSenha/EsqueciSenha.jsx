import React from "react";
import "./EsqueciSenha.css";

function EsqueciSenha() {
  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 id="titulo">Esqueceu a senha?</h1>
        <p id="sub_titulo" className="">
          Insira seu email e enviaremos um link para redefinir sua senha
        </p>
        <form>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email_es"
              placeholder="Email"
            />
          </div>
          <button id="enviar_btn" type="submit" className="btn">
            Enviar link de recuperação
          </button>
        </form>
      </div>
    </>
  );
}

export default EsqueciSenha;
