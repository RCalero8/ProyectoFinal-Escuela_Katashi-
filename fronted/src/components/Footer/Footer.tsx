import "./Footer.css";
import {Link, useLocation} from "react-router-dom";

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
                    <ul>
                        <li>📍 C/Juan Agustín Palomar, 10, (41900) Camas, Sevilla</li>
                        <li> 📞 +34 955 123 456</li>
                        <li> 📧 infoKarateKatashi@gmail.com </li>
                    </ul>
                </div>
                <div className="footer-box">
                    <h4>Síguenos</h4>
                    <div className="social-icons">
                        <a href="https://www.facebook.com/escueladeartesmarcialesshurite/?locale=es_ES"><img src="Imagenes_Invitado\Redes_sociales\facebook.png" alt="Facebook" /></a>
                        <a href="https://www.instagram.com/artesmarcialeshurite/"><img src="Imagenes_Invitado\Redes_sociales\instagram.png" alt="Instagram" /></a>
                    </div>
                    <div className="formulario">
                        <p>Recibe nuestras noticias</p>
                        <form>
                            <input type="email" placeholder="Tu email" />
                            <button type="submit">→</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Escuela de Karate Katashi. Todos los derechos reservados.</p>
            </div>
        </footer>
    )
}
