import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// bootsrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

// css
import "./index.css";

// paginas
import App from "./App.jsx";
import Obras from "./Obras.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/obras/:id" element={<Obras />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
