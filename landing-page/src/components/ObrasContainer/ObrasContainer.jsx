import React, { useState, useEffect } from "react";
import "./ObrasContainer.css";
import api from "../../services/api";
import { toast, ToastContainer } from "react-toastify";

// componentes

import Card from "../Card/Card";

function ObrasContainer() {
  const [obras, setObras] = useState([
    {
      id: 0,
      foto: "./img/obra1.png",
      titulo: "This outstanding object",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: "Nanquim sobre papel",
      descricao:
        "Call out a feature, benefit, or value of your site or product that can stand on its own.",
    },
    {
      id: 1,
      foto: "./img/obra2.png",
      titulo: "This outstanding article",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: "Nanquim sobre papel",
      descricao:
        "Cards are a great way to organize content in a collection—products, case studies, services, and more.",
    },
    {
      id: 2,
      foto: "./img/obra3.png",
      titulo: "This brilliant bit",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: "Nanquim sobre papel",
      descricao:
        "Add more cards to this little stack to build out a grid of whatever size and shape you need.",
    },
  ]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [filtro, setFiltro] = useState();

  function handleFiltroChange(e) {
    setFiltro(e.target.value);
  }

  useEffect(() => {
    async function buscarObras() {
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

        console.log(response);
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
    buscarObras();
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
            <label className="btn btn-outline-dark filtro_botao" htmlFor="radioTodos">
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
            <label className="btn btn-outline-dark filtro_botao" htmlFor="radioPintura">
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
            <label className="btn btn-outline-dark filtro_botao" htmlFor="radioEscultura">
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
            <label className="btn btn-outline-dark filtro_botao" htmlFor="radioGravura">
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
            <label className="btn btn-outline-dark filtro_botao" htmlFor="radioDesenho">
              Desenho
            </label>
          </div>

          <div
            id="obras_cards"
            className="d-flex flex-wrap p-4 gap-4 justify-content-center"
          >
            {obras.map((obra) => (
              <Card
                id={obra.id}
                foto={obra.foto}
                titulo={obra.titulo}
                descricao={obra.descricao}
                key={obra.id}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ObrasContainer;
