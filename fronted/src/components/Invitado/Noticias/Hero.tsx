import React from "react";
import '../../../style/Invitado/Noticias/Hero.css';

const Hero: React.FC = () => {
    return (
        <div className="hero-container">
            {/*Sección superior con imagen de fondo y titulo*/}
            <header className="hero-header">
                <div className="hero-header_logo">
                    <h1 className="hero-header_titulo">📰 Noticias del dojo</h1>
                </div>
                <h2 className="hero-header_subtitulo">Consulta las últimas novedades, comunicados y eventos importantes.</h2>
            </header>
            {/*Sección inferior con texto informativo*/}
            <footer className="hero-footer">
                <p className="hero-footer_texto">
                    Mantente informado de los eventos, actividades y anuncios importantes de la Escuela de Karate Katashi.
                </p>
            </footer>
        </div>
    );
};

export default Hero;