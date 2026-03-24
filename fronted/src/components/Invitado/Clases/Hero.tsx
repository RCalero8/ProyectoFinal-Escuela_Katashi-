import React from "react";
import "../../../style/Invitado/Clase/Hero.css";

const Hero: React.FC = () => {
  return (
    <div className="hero-clases">
      <div className="hero-clases-bg" />
      <div className="hero-clases-content">
        <h1 className="hero-clases-titulo">Nuestras Clases</h1>
        <p className="hero-clases-subtitulo">
          Entrenamientos adaptados a cada edad y objetivo. Haz clic en Más información
          para conocer cada clase.
        </p>
      </div>
    </div>
  );
};

export default Hero;