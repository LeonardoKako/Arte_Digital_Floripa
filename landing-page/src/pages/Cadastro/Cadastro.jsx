import React,{ useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import api from "../../services/api";
import "./Cadastro.css";

function Cadastro() {
  // setando estados para os campos

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [novoUsuario, setNovoUsuario] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  // Funções handle

  function handleNome(e) {
    setNome(e.target.value);
    console.log(nome);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
    console.log(email);
  }
  function handleSenha(e) {
    setSenha(e.target.value);
    console.log(senha);
  }
  function handleConfirmarSenha(e) {
    setConfirmarSenha(e.target.value);
    console.log(confirmarSenha);
  }
  function handleEnviar(e) {
    e.preventDefault();
    if (senha == confirmarSenha) {
      setNovoUsuario({
        nome: nome,
        email: email,
        senha: senha,
      });
      console.log(novoUsuario);
    } else {
      toast.error("As senhas não são iguais.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  // axios

  async function novoCadastro() {
    try {
      const response = await axios.post("", novoUsuario);
    } catch (error) {}
  }

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
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
        <h1 id="titulo">Criar Conta</h1>
        <p id="sub_titulo" className="">
          Preencha os dados abaixo
        </p>
        <form>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="nome"
              placeholder="Nome Completo"
              aria-describedby="emailHelp"
              onChange={handleNome}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              onChange={handleEmail}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="senha"
              placeholder="Senha"
              onChange={handleSenha}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="confirmar_senha"
              placeholder="Confirmar Senha"
              onChange={handleConfirmarSenha}
            />
          </div>
          <button
            onClick={handleEnviar}
            id="enviar_btn"
            type="submit"
            className="btn"
          >
            Enviar
          </button>
        </form>
        <p id="login_p">
          Já tem uma conta?{" "}
          <Link id="login_link" to="/login">
            Fazer Login
          </Link>
        </p>
      </div>
    </>
  );
}

export default Cadastro;
