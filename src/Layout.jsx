import React from "react";
import { Outlet } from "react-router-dom";

// componentes

import Navbar from "./assets/Navbar";
import Footer from "./assets/Footer";

function Layout() {
  return (
    <div className="layout-container">
      {/* Header */}
      <header>
        <Navbar />
      </header>

      <main className="conteudo mb-3">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
