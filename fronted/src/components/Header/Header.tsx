import {Link, useLocation} from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export function Header() {
    const location = useLocation();
    const [menuOpen, setMenuOpen] = useState(false);
    
    const isActive = (path: string) => {
        return location.pathname === path ? "active" : "";
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };
    
    return (
        <header className="header">
            <div className="header-left">
                <img src="/Imagenes_Invitado/Logo.png" alt="Logo" className="logo_header" />
                <nav className="nav">
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
                </nav>
            </div>
            <div className="header-right">
                <button className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <Link to="/login"><button className="btn inicio">Login</button></Link>
                <Link to="/registro"><button className="btn registro">Registro</button></Link>
            </div>
            <nav className={`nav mobile ${menuOpen ? "open" : ""}`}>
                <ul>
                    <li>
                        <Link to="/" className={isActive("/")} onClick={closeMenu}>Inicio</Link>
                    </li>
                    <li>
                        <Link to="/conocenos" className={isActive("/conocenos")} onClick={closeMenu}>Conocenos</Link>
                    </li>
                    <li>
                        <Link to="/clases" className={isActive("/clases")} onClick={closeMenu}>Clases</Link>
                    </li>
                    <li>
                        <Link to="/noticias" className={isActive("/noticias")} onClick={closeMenu}>Noticias</Link>
                    </li>
                    <li>
                        <Link to="/tienda" className={isActive("/tienda")} onClick={closeMenu}>Tienda</Link>
                    </li>
                    <li>
                        <Link to="/contacto" className={isActive("/contacto")} onClick={closeMenu}>Contacto</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
