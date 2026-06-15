import React, { useEffect, useState } from "react";
import "./NovaObra.css";
import Footer from "../../components/Footer/Footer";
import LinhaObra from "./components/LinhaObra/LinhaObra.jsx";
import api from "../../services/api.js";

// {
//   id: 0,
//   nome: "bruxas da ilha",
//   foto: "./img/obra1.png",
//   autor: "Franklin Cascaes",
//   ano: 1950,
//   categoria: "Desenho",
// }]

function NovaObra() {
  // states

  const [obras, setObras] = useState([]);
  const [filtros, setFiltros] = useState({
    titulo: "",
    categoria: "",
    ano: "",
  });

  // handlers

  function handleTitulo(e) {
    setFiltros((filtroAnterior) => ({
      ...filtroAnterior,
      titulo: e.target.value,
    }));
  }

  function handleCategoria(e) {
    if (e.target.value === "todos") {
      setFiltros((filtroAnterior) => ({
        ...filtroAnterior,
        categoria: ""
      }));
    } else {
      setFiltros((filtroAnterior) => ({
        ...filtroAnterior,
        categoria: e.target.value,
      }));
    }
  }

  function handleAno(e) {
    setFiltros((filtroAnterior) => ({
      ...filtroAnterior,
      ano: e.target.value,
    }));
  }

  function handleLimpar(e) {
    e.preventDefault();
    setFiltros({
      titulo: "",
      categoria: "",
      ano: "",
    });
  }

  // request

  useEffect(() => {
    async function fetchObras() {
      try {
        const parametros = {};

        // verificando e montando os parametros da request

        if (filtros.titulo) parametros.titulo = filtros.titulo;
        if (filtros.categoria) parametros.categoria = filtros.categoria;
        if (filtros.ano) parametros.ano = filtros.ano;

        const response = await api.get(`/obras/listar`, {
          params: parametros,
        });

        setObras(response.data || []);
      } catch (error) {
        toast.error("Erro ao buscar obras.", {
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
    fetchObras();
  }, [filtros]);

  return (
    <>
      <div className="container-fluid">
        <nav id="nav_container" className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              <div className="d-flex ms-5 align-items-center">
                <img
                  src="/img/logo.png"
                  alt="Logo da fundação cultural de Florianopolis Franklin Cascaes"
                  className="logo m-2"
                />
                <h1 className="titulo">Acervo Franklin Cascaes</h1>
              </div>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>
      </div>

      <main>
        <div id="container_obras_no" className="container mt-4">
          <div
            id="container_procura"
            className="d-flex justify-content-between"
          >
            {/* input - procurar */}
            <div>
              <form>
                <input
                  id="procurar_obra"
                  className="form-control"
                  type="search"
                  placeholder="Buscar obra..."
                  onChange={handleTitulo}
                  value={filtros.titulo}
                />
              </form>
            </div>

            {/* Input - categoria */}
            <div>
              <select
                onChange={handleCategoria}
                value={filtros.categoria}
                className="form-select"
                id="categoria_select"
              >
                <option value="todos">Categoria</option>
                <option value="pintura">Pintura</option>
                <option value="escultura">Escultura</option>
                <option value="gravura">Gravura</option>
                <option value="desenho">Desenho</option>
              </select>
            </div>

            {/* input - ano */}
            <div>
              <select className="form-select" id="ano_select">
                <option defaultValue>Ano</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>

            {/* botão - limpar filtros */}
            <button
              id="limpar_filtros"
              onClick={handleLimpar}
              type="button"
              className="btn d-flex justify-content-center align-items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-arrow-repeat me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z"
                />
              </svg>
              Limpar filtros
            </button>

            {/* botão - nova obra */}
            <button
              id="btn_nova_obra"
              type="button"
              className="btn btn-dark d-flex justify-content-center align-items-center"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="23"
                height="23"
                fill="currentColor"
                className="bi bi-plus me-2"
                viewBox="0 0 16 16"
              >
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
              </svg>
              Nova obra
            </button>
          </div>

          {/* resultados */}
          <div id="container_resultado">
            <table className="table text-center">
              <thead>
                <tr>
                  <th scope="col">Imagem</th>
                  <th scope="col">Nome da Obra</th>
                  <th scope="col">Artista</th>
                  <th scope="col">Ano</th>
                  <th scope="col">Categoria</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody className="table-group-divider">
                {obras.map((obra) => (
                  <LinhaObra
                    id={obra.id_obra}
                    imagem={obra.midia3d?.[0]?.nome_arquivo}
                    nome={obra.titulo}
                    artista={obra.autor_acervo?.[0]?.autor.nome_publico}
                    ano={obra.data_criacao}
                    categoria={obra.categoria}
                    key={obra.id_obra}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />

      {/* <!-- offcanvas menu --> */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="titulo_no" className="offcanvasMenuLabel">
            Nova Obra
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <p id="sub_titulo_no" className="ms-3">
          Preencha os dados da obra
        </p>
        <div className="offcanvas-body d-flex flex-column">
          {/* input - file */}
          <div className="mb-5 d-flex flex-column">
            <label
              htmlFor="btn_modal_no"
              className="form-label titulo_item_no mb-4"
            >
              Imagem da Obra
            </label>
            <button
              id="btn_modal_no"
              type="button"
              className="btn"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.3"
                  d="M7.59952 19.6591V-4.29153e-06H12.0597V19.6591H7.59952ZM8.87513e-05 12.0597V7.59943H19.6592V12.0597H8.87513e-05Z"
                  fill="black"
                />
              </svg>
            </button>
          </div>

          {/* input - nome */}
          <div className="mb-4">
            <label htmlFor="nome_no" className="form-label titulo_item_no">
              Nome da obra
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="nome_no"
                placeholder="Ex: Noite Estrelada"
                aria-describedby="basic-addon3 basic-addon4"
              />
            </div>
          </div>

          {/* input - categoria */}
          <div className="mb-4">
            <label htmlFor="categoria_no" className="form-label titulo_item_no">
              Categoria
            </label>
            <div className="input-group">
              <select className="form-select" id="categoria_no">
                <option defaultValue>Selecione a categoria</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
          </div>

          {/* input - Ano */}
          <div className="mb-4">
            <label htmlFor="ano_no" className="form-label titulo_item_no">
              Ano
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="ano_no"
                placeholder="Ex: 1997"
                aria-describedby="basic-addon3 basic-addon4"
              />
            </div>
          </div>

          {/* input - Descriçao */}
          <div className="mb-4">
            <label htmlFor="descricao_no" className="form-label titulo_item_no">
              Descrição
            </label>
            <div className="input-group">
              <textarea
                id="descricao_no"
                className="form-control"
                aria-label="With textarea"
                placeholder="Descrição da obra"
              ></textarea>
            </div>
          </div>

          <div id="salvar_btn" className="mb-3 ms-auto">
            <button className="btn">Salvar</button>
          </div>
        </div>
      </div>

      {/* modal da nova obra - não terminado*/}
      <div
        className="modal fade modal-dialog modal-dialog-centered "
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Enviar imagem
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="input-group mb-3">
                  <input type="file" className="form-control" id="obra_img" />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary">
                Enviar imagem
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NovaObra;
