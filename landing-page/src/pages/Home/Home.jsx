import React, {useEffect} from "react";
import "../../App.css"; // Se App.css ainda existir e for necessário
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useLocation } from "react-router-dom";

// Componentes
import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import SearchObras from "../../components/SearchObras/SearchObras";
import ObrasContainer from "../../components/ObrasContainer/ObrasContainer";

function Home() {
  const location = useLocation();

  useEffect(() => {
    const msg = location.state?.msg;

    if (msg) {
      toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }, [location.state]);

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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

export default Home;
