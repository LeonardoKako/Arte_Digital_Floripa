import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Obras.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes

import Navbar from "./assets/Navbar";

function Obras() {
  const { id } = useParams();
  const navigate = useNavigate();

  const obras = [
    {
      id: 0,
      foto: "/img/obra1.png",
      titulo: "This outstanding object",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: 'Nanquim sobre papel',
      descricao:
        "Call out a feature, benefit, or value of your site or product that can stand on its own.",
    },
    {
      id: 1,
      foto: "/img/obra2.png",
      titulo: "This outstanding article",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: 'Nanquim sobre papel',
      descricao:
        "Cards are a great way to organize content in a collection—products, case studies, services, and more.",
    },
    {
      id: 2,
      foto: "/img/obra3.png",
      titulo: "This brilliant bit",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: 'Nanquim sobre papel',
      descricao:
        "Add more cards to this little stack to build out a grid of whatever size and shape you need.",
    },
  ];

  var obra = obras[Number(id)];

  if (!obra) {
    return <h1>Obra não encontrada</h1>;
  }

  return (
    <>
      {/* Header */}
      <header>
        <Navbar />
      </header>
      <main className="mb-3">
        <div id="main-container" className=" d-flex flex-column">
          <div className="container-fluid d-flex justify-content-start">
            <button className="btn" onClick={() => navigate(-1)}>
              <img src="/img/voltar.png" id="voltar" />
            </button>
          </div>
          <img
            src={obras[Number(id)].foto}
            alt={obras[Number(id)].titulo}
            id="imagem"
          />
          <div id="info_container" className="px-5">
            <div
              id="categorias"
              className="container-fluid d-flex flex-row gap-2"
            >
              <button type="button" className="btn">
                {obras[Number(id)].categoria}
              </button>
            </div>
            <div
              id="autor_container"
              className="container-fluid d-flex flex-column"
            >
              <p id="titulo">{obras[Number(id)].titulo}</p>
              <p id="autor">{obras[Number(id)].autor}</p>
            </div>
            <div
              id="info_tecnica"
              className="container-fluid row gap-4 align-items-center mb-4"
            >
              <div id="ano" className="col-5 py-3 px-5">
                <div className="row">Ano</div>
                <div className="row">{obras[Number(id)].ano}</div>
              </div>
              <div id="tecnica" className="col-5 py-3 px-5">
                <div className="row">Técnica</div>
                <div className="row">{obras[Number(id)].tecnica}</div>
              </div>
            </div>
            <div id="descricao_container">
              <h5 className="fw-bold">Descrição</h5>
              <p id="descricao">{obras[id].descricao}</p>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer></footer>
    </>
  );
}

export default Obras;
