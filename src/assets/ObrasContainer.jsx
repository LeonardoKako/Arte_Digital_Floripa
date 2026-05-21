import React from "react";
import "./css/Obras_container.css";

function ObrasContainer() {
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

          <div id="obras_cards" className="d-flex">
            <div className="card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
            <div className="card">
              <img src="" className="card-img-top" alt="" />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card’s content.
                </p>
                <a href="#" className="btn btn-primary">
                  Go somewhere
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ObrasContainer;
