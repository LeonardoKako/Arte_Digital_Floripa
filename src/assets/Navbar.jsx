import React from "react";
import { Link } from "react-router-dom";

import "./css/navbar_styles.css";

function Navbar() {
  return (
    <>
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

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  id="btn_sobre"
                  className="nav-link active"
                  aria-current="page"
                  href="/sobre"
                >
                  Sobre
                </a>
              </li>
              <li className="nav-item">
                <a id="btn_obras" className=" btn btn-dark" href="/obras">
                  Obras
                </a>
              </li>
              <li className="nav-item">
                {/* <!-- Button trigger offcanvas --> */}
                <button
                  type="button"
                  id="btn_menu"
                  className="nav-link border-0 bg-transparent"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#offcanvasMenu"
                  aria-controls="offcanvasMenu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    fill="black"
                    className="bi bi-list"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                    />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- offcanvas menu --> */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 id="offcanvasMenuLabel">Menu</h5>

          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/sobre">
                Sobre
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/obras">
                Obras
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
