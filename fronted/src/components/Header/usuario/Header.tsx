import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const HeaderUsuario: React.FC = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const nombre  = usuario?.nombre || "Usuario";
  const inicial = nombre.charAt(0).toUpperCase();

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <header className="header-usuario">

      {/* Logo */}
      <Link to="/usuario" className="header-usuario-logo">
        <img src="/Imagenes_Invitado/Logo.png" alt="Logo Katashi" />
      </Link>

      {/* Nav */}
      <nav className="header-usuario-nav">
        <ul>
          <li><Link to="/usuario" className={isActive("/usuario")}>Inicio</Link></li>
          <li><Link to="/usuario/clases" className={isActive("/usuario/clases")}>Mis clases</Link></li>
          <li><Link to="/usuario/pagos" className={isActive("/usuario/pagos")}>Pagos</Link></li>
          <li><Link to="/usuario/federacion" className={isActive("/usuario/federacion")}>Federación</Link></li>
          <li><Link to="/noticias" className={isActive("/noticias")}>Noticias</Link></li>
          <li><Link to="/contacto" className={isActive("/contacto")}>Contacto</Link></li>
          <li><Link to="/tienda" className={isActive("/tienda")}>Tienda</Link></li>
        </ul>
      </nav>

      {/* Perfil */}
      <div className="header-usuario-perfil">
        <span className="header-usuario-bienvenida">
          Bienvenido, <span>{nombre}</span>
        </span>
        <div className="header-usuario-avatar">{inicial}</div>
        <button className="header-usuario-logout" onClick={handleLogout}>
          Salir
        </button>
      </div>

    </header>
  );
};

export default HeaderUsuario;
