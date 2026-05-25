import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes

import Navbar from "./assets/Navbar";
import Hero from "./assets/Hero";
import SearchObras from "./assets/SearchObras";
import ObrasContainer from "./assets/ObrasContainer";

function App() {
  return (
    <>
      {/* hero */}
      <Hero />
      {/* Header 2 - procurar obras */}
      <SearchObras />
      {/* Obras */}
      <ObrasContainer />
      {/* Footer */}
    </>
  );
}

export default App;
