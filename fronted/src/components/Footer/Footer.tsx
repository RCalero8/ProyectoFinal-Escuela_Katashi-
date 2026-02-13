import "./Footer.css";
import { Link, useLocation } from "react-router-dom";

export function Footer() {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path ? "active" : "";
    };

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-box footer-logo-section">
                    <div className="logo-text">
                        <img src="/Imagenes_Invitado/Logo.png" alt="Logo" className="footer-logo" />
                        <div className="textos">
                            <h4>
                                Escuela de Karate<br />
                                <span className="katashi">Katashi</span>
                            </h4>
                            <p>Formando karatekas desde 2010. Disciplina, respeto y superación.</p>
                        </div>
                    </div>
                </div>
                <div className="footer-box footer-links">
                    <h4>Enlaces Rápidos</h4>
                    <ul>
                        <li>
                            <Link to="/" className={isActive("/")}>Inicio</Link>
                        </li>
                        <li>
                            <Link to="/conocenos" className={isActive("/conocenos")}>Conocenos</Link>
                        </li>
                        <li>
                            <Link to="/clases" className={isActive("/clases")}>Clases</Link>
                        </li>
                        <li>
                            <Link to="/noticias" className={isActive("/noticias")}>Noticias</Link>
                        </li>
                        <li>
                            <Link to="/tienda" className={isActive("/tienda")}>Tienda</Link>
                        </li>
                        <li>
                            <Link to="/contacto" className={isActive("/contacto")}>Contacto</Link>
                        </li>
                    </ul>
                </div>
                <div className="footer-box">
                    <h4>Contacto</h4>
                    <p>📍  C/ Nombre, 123, Camas</p>
                    <p>📞  +34 955 123 456</p>
                    <p>📧  info@karatecamas.es</p>
                </div>
                <div className="footer-box">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://facebook.com" target="_blank">
                            <img src="/Imagenes_Invitado/Facebook.png" alt="Facebook" />
                        </a>
                        <a href="https://instagram.com" target="_blank">
                            <img src="/Imagenes_Invitado/Instagram.png" alt="Instagram" />
                        </a>
                        <a href="https://x.com" target="_blank">
                            <img src="/Imagenes_Invitado/X.png" alt="X" />
                        </a>
                    </div>
                    <p className="newsletter">Recibe nuestras noticias</p>
                    <form method="POST" className="newsletter-form">
                        <input type="email" placeholder="Tu correo electrónico" required />
                        <button type="submit">→</button>
                    </form>

                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Escuela de Karate Katashi. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
