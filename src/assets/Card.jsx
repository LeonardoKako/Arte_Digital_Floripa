import React from "react";
import "./css/Card.css"

function Card({ titulo, descricao, foto }) {
  return (
    <>
      <div className="card">
        <img src={foto} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descricao}</p>
          <a href="#" className="btn fw-bold">
            Ver mais...
          </a>
        </div>
      </div>
    </>
  );
}

export default Card;
