import React from "react";
import "../../../style/Usuario/Federacion/Hero.css";

const Hero: React.FC = () => {
  return (
    <div className="hero-clases">
      <div className="hero-clases-bg" />
      <div className="hero-clases-content">
        <h1 className="hero-clases-titulo">🥋 Federación</h1>
        <p className="hero-clases-subtitulo">
          Consulta tu ficha federativa, estado de licencia y documentación relacionada
        </p>
      </div>
    </div>
  );
};

export default Hero;
