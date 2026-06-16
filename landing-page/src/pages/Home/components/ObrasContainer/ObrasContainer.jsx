import React, { useState, useEffect } from "react";
import "./ObrasContainer.css";
import api from "../../../../services/api";
import { toast } from "react-toastify";

// componentes

import Card from "../../../../components/Card/Card.jsx";

function ObrasContainer() {
  // definir estados
  const [obras, setObras] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [tituloInput, setTituloInput] = useState("");
  const [filtro, setFiltro] = useState({
    categoria: "todos",
    titulo: "",
  });

  // handlers

  function handleCategoria(e) {
    setFiltro((filtroAnterior) => ({
      ...filtroAnterior,
      categoria: e.target.value,
    }));
  }

  function handleProcurar(e) {
    e.preventDefault();
    setFiltro((filtroAnterior) => ({
      ...filtroAnterior,
      titulo: tituloInput,
    }));
  }

  function handleProcInput(e) {
    setTituloInput(e.target.value);
  }

  // effects e requests

  useEffect(() => {
    async function fetchObras() {
      try {
        setCarregando(true);
        const parametros = {};

        // verificando e montando os parametros da request

        if (filtro.titulo) parametros.titulo = filtro.titulo;
        if (filtro.categoria && filtro.categoria !== "todos") {
          parametros.categoria = filtro.categoria;
        }

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
      } finally {
        setCarregando(false);
      }
    }
    fetchObras();
  }, [filtro]);

  return (
    <>
      <div className="container-fluid d-flex justify-content-center align-items-center" id="search_container">
        <form className="d-flex justify-content-center align-items-center" role="search" onSubmit={handleProcurar}>
          <button
            id="botao_procurar"
            className="btn"
            type="submit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
          <input
            className="form-control me-2"
            id="search_input"
            type="search"
            placeholder="Buscar obras..."
            aria-label="Search"
            onChange={handleProcInput}
            value={tituloInput}
          />
        </form>
      </div>
      <div id="obras_container">
        <div id="container_interno">
          <div id="botao_tipo" className="d-flex gap-2">
            <input
              type="radio"
              className="btn btn-check "
              name="filtroObra"
              id="radioTodos"
              value="todos"
              checked={filtro.categoria === "todos"}
              onChange={handleCategoria}
            />
            <label
              className="btn btn-outline-dark filtro_botao"
              htmlFor="radioTodos"
            >
              Todos
            </label>
            <input
              type="radio"
              className="btn-check"
              name="filtroObra"
              id="radioPintura"
              value="pintura"
              checked={filtro.categoria === "pintura"}
              onChange={handleCategoria}
            />
            <label
              className="btn btn-outline-dark filtro_botao"
              htmlFor="radioPintura"
            >
              Pintura
            </label>
            <input
              type="radio"
              className="btn-check"
              name="filtroObra"
              id="radioEscultura"
              value="escultura"
              checked={filtro.categoria === "escultura"}
              onChange={handleCategoria}
            />
            <label
              className="btn btn-outline-dark filtro_botao"
              htmlFor="radioEscultura"
            >
              Escultura
            </label>
            <input
              type="radio"
              className="btn-check"
              name="filtroObra"
              id="radioGravura"
              value="gravura"
              checked={filtro.categoria === "gravura"}
              onChange={handleCategoria}
            />
            <label
              className="btn btn-outline-dark filtro_botao"
              htmlFor="radioGravura"
            >
              Gravura
            </label>
            <input
              type="radio"
              className="btn-check"
              name="filtroObra"
              id="radioDesenho"
              value="desenho"
              checked={filtro.categoria === "desenho"}
              onChange={handleCategoria}
            />
            <label
              className="btn btn-outline-dark filtro_botao"
              htmlFor="radioDesenho"
            >
              Desenho
            </label>
          </div>

          <div
            id="obras_cards"
            className="d-flex flex-wrap p-4 gap-4 justify-content-center"
          >
            {carregando ? (
              <p>Carregando obras...</p>
            ) : obras.length > 0 ? (
              obras.map((obra) => (
                <Card
                  id={obra.id_obra}
                  foto={obra.midia3d?.[0]?.nome_arquivo}
                  titulo={obra.titulo}
                  descricao={obra.descricao}
                  key={obra.id_obra}
                />
              ))
            ) : (
              <p>Nenhuma obra encontrada.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ObrasContainer;
