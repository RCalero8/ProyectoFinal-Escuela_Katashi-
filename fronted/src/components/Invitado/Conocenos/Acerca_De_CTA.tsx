import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../style/Invitado/Conocenos/Acerca_De_CTA.css";

const AcercaDeCta: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* ── Hero con imagen de fondo ── */}
      <div className="cta-hero">
        <div className="cta-hero-bg" />
        <div className="cta-hero-content">
          <h2 className="cta-hero-titulo">¿Quieres unirte a nuestra escuela?</h2>
          <p className="cta-hero-subtitulo">
            Únete a nuestra comunidad y comienza tu transformación física y mental hoy mismo.
          </p>
          <div className="cta-hero-botones">
            <button className="cta-btn-registro" onClick={() => navigate("/registro")}>
              Registrarse
            </button>
            <button className="cta-btn-login" onClick={() => navigate("/login")}>
              Inicio Sesion
            </button>
            <button className="cta-btn-clases" onClick={() => navigate("/clases")}>
              Ver nuestras clases
            </button>
          </div>
        </div>
      </div>

      {/* ── Banner rojo inferior ── */}
      <div className="cta-banner">
        <h3 className="cta-banner-titulo">Primera clase gratis</h3>
        <p className="cta-banner-desc">
          Ven a probar una clase sin compromiso. Conoce a nuestros senseis, nuestras
          instalaciones y el ambiente de nuestra escuela.
        </p>
        <div className="cta-banner-items">
          <span className="cta-banner-item">Sin permanencia</span>
          <span className="cta-banner-item">Material incluido</span>
          <span className="cta-banner-item">Todos los niveles</span>
        </div>
      </div>
    </>
  );
};

export default AcercaDeCta;