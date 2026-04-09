import React from 'react';
import '../../../style/Invitado/Clases/Ayuda.css';

const Ayuda: React.FC = () => {

    return (
    <section className="help-banner">
      <h2 className="help-banner__title">Necesitas Ayuda</h2>
      <p className="help-banner__text">
        Si necesitas ayuda para elegir tu clase, contáctanos.
      </p>
      <a 
        href="/contacto" 
        className="help-banner__button" 
        aria-label="Contactar con la escuela"
      >
        Contactar con la escuela
      </a>
    </section>
  );
};

export default Ayuda;