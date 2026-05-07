import { Link } from 'react-router-dom';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-katashi">
      <div className="footer-content">
        {/* Enlaces principales a la izquierda */}
        <nav className="footer-main-nav">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/clases">Clase</Link></li>
            <li><Link to="/horarios">Horario</Link></li>
            <li><Link to="/noticias">Noticia</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/tienda">Tienda</Link></li>
          </ul>
        </nav>

        {/* Enlaces legales y Logo a la derecha */}
        <div className="footer-right-section">
          <div className="footer-legal">
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/privacidad">Política Privacidad</Link>
            <span className="footer-separator">|</span>
            <Link to="/terminos">Términos y condiciones</Link>
          </div>
          
          <div className="footer-logo-container">
            <div className="footer-logo-circle">
            <img src="/Imagenes_Invitados/Logo.png" alt="Logo" />              
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};