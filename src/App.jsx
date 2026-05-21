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
      {/* Header */}
      <header>
        <Navbar />
      </header>
      <main>
        {/* hero */}
        <Hero />
        {/* Header 2 - procurar obras */}
        <SearchObras />
        {/* Obras */}
        <ObrasContainer />
      </main>
      {/* Footer */}
      <footer></footer>
    </>
  );
}

export default App;
