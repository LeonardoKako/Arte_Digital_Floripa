import React, { useState, useEffect } from "react";
import "./ObrasContainer.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

// componentes

import Card from "../Card/Card";

function ObrasContainer() {
  const [obras, setObras] = useState([]);
  const [obrasProcuradas, setObrasProcuradas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState('todos');
  const [obraProcurar, setObraProcurar] = useState("");
  const [procurar, setProcurar] = useState(false);

  function handleFiltroChange(e) {
    setFiltro(e.target.value);
  }

  function handleProcurar(e) {
    e.preventDefault();
    setProcurar(true);
  }

  function handleProcInput(e) {
    setObraProcurar(e.target.value);
  }

  useEffect(() => {
    async function buscarObras() {
      try {
        const response = await api.get(
          `/obras/listar?titulo=${obraProcurar}`,
        );

        setObrasProcuradas(response.data);
        setObraProcurar('')
      } catch (error) {
        toast.error("Erro ao procurar por obras.", {
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
    buscarObras()
  }, [procurar]);

  useEffect(() => {
    async function fetchObras() {
      try {
        setCarregando(true);
        setErro(null);

        let parametros;

        if (filtro === "todos") {
          parametros = {};
        } else {
          parametros = { categoria: filtro };
        }

        const response = await api.get(`/obras/listar`, {
          params: parametros,
        });

        setObras(response.data);

        console.log(obras);
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

      <div className="container-fluid" id="search_container">
        <form className="d-flex my-auto" role="search">
          <button
            onClick={handleProcurar}
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
              checked={filtro === "todos"}
              onChange={handleFiltroChange}
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
              checked={filtro === "pintura"}
              onChange={handleFiltroChange}
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
              checked={filtro === "escultura"}
              onChange={handleFiltroChange}
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
              checked={filtro === "gravura"}
              onChange={handleFiltroChange}
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
              checked={filtro === "desenho"}
              onChange={handleFiltroChange}
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
            {obrasProcuradas && obrasProcuradas.length > 0
              ? obrasProcuradas.map((obra) => (
                  <Card
                    id={obra.id_obra}
                    foto={obra.midia3d[0].nome_arquivo}
                    titulo={obra.titulo}
                    descricao={obra.descricao}
                    key={obra.id_obra}
                  />
                ))
              : obras.map((obra) => (
                  <Card
                    id={obra.id_obra}
                    foto={obra.midia3d[0].nome_arquivo}
                    titulo={obra.titulo}
                    descricao={obra.descricao}
                    key={obra.id_obra}
                  />
                ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ObrasContainer;
