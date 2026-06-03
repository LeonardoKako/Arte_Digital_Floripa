import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div id="login_container" className="container-fluid text-center ">
          <h4 id="titulo" className="my-5">
            Faça seu login
          </h4>
          <div className="input-group mb-3 px-5">
            <input
              id="usuario_input"
              type="text"
              className="form-control"
              placeholder="E-mail ou Usuário"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
          <div className="input-group mb-3 px-5">
            <input
              id="senha_input"
              type="password"
              className="form-control"
              placeholder="Senha"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="container-fluid d-flex justify-content-between px-5">
            <div id="lembrar_container" className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="checkDefault"
              />
              <label className="form-check-label" htmlFor="checkDefault">
                Lembrar de mim
              </label>
            </div>
            <p>
              <Link
                id="link_esqueci_senha"
                className=" link-dark link-offset-2 link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                to="/esqueci-senha"
              >
                Esqueci minha senha
              </Link>
            </p>
          </div>
          <button id="entrar_btn" type="button" className="btn">
            Entrar
          </button>
          <p id="cadastro_p" className="mt-5">
            Não tem conta ainda?
            <Link
              id="cadastro_link"
              className="px-2 link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
              to="/cadastro"
            >
              Crie agora
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
