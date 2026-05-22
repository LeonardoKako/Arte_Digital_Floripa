import React from "react";
import { Link } from "react-router-dom";
import "./Card.css"

function Card({id, titulo, descricao, foto }) {
  return (
    <>
      <div className="card">
        <img src={foto} className="card-img-top" alt="" />
        <div className="card-body">
          <h5 className="card-title">{titulo}</h5>
          <p className="card-text">{descricao}</p>
          <a href="#" >

          </a>
          <Link to={`/obras/${id}`} className="btn fw-bold">Ver mais...</Link>
        </div>
      </div>
    </>
  );
}

export default Card;
