import React from "react";
import "../../App.css"; // Se App.css ainda existir e for necessário
import "bootstrap/dist/css/bootstrap.min.css";

// Componentes
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchObras from "../../components/SearchObras/SearchObras";
import ObrasContainer from "../../components/ObrasContainer/ObrasContainer";

function Home() {
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

export default Home;
