import React from 'react';
import "../../../style/Invitado/Contacto/Hero.css"

const Hero: React.FC = () => {
    return (
        <div className="hero">
            <div className="hero-content">
                <h1 className="hero-titulo">📞 Contacto con Nosotros</h1>
                <p className="hero-subtitulo">Estamos aquí para resolver tus dudas sobre clases, horarios o inscripciones.</p>
            </div>
        </div>
    );
}

export default Hero;