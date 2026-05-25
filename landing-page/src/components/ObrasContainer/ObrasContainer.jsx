import React from "react";
import "./ObrasContainer.css";

// componentes

import Card from "../Card/Card";

function ObrasContainer() {
  var obras = [
    {
      id: 0,
      foto: "./img/obra1.png",
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
      foto: "./img/obra2.png",
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
      foto: "./img/obra3.png",
      titulo: "This brilliant bit",
      autor: "Franklin Cascaes",
      ano: 1965,
      categoria: "desenho",
      tecnica: 'Nanquim sobre papel',
      descricao:
        "Add more cards to this little stack to build out a grid of whatever size and shape you need.",
    },
  ];

  return (
    <>
      <div id="obras_container">
        <div id="container_interno">
          <div id="botao_tipo" className="d-flex gap-2">
            <button type="button" className="btn btn-dark">
              Todos
            </button>
            <button type="button" className="btn btn-secondary">
              Pintura
            </button>
            <button type="button" className="btn btn-secondary">
              Escultura
            </button>
            <button type="button" className="btn btn-secondary">
              Gravura
            </button>
            <button type="button" className="btn btn-secondary">
              Desenho
            </button>
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
