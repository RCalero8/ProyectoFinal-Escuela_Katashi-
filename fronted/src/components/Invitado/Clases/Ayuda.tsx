import React from 'react';
import '../../../style/Invitado/Clases/Ayuda.css';

const Ayuda: React.FC = () => {

    return (
      <div className="help-banner-wrapper">
        <section className="help-banner">
          <h2 className="help-banner_titulo">Necesitas Ayuda</h2>
          <p className="help-banner_texto">Si necesitas ayuda para elegir tu clase, contáctanos</p>
          <a href='/contacto' className='help-banner_boton' aria-label='Contactar con la escuela'>Contactar con la escuela</a>
        </section>
      </div>
  );
};

export default Ayuda;