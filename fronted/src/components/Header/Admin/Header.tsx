import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

const HeaderAdmin: React.FC = () => {
  const location = useLocation();
  const navigate  = useNavigate();
  const usuario   = JSON.parse(localStorage.getItem("usuario") || "{}");
  const inicial   = (usuario?.nombre || "A").charAt(0).toUpperCase();

  const isActive = (path: string) =>
    location.pathname === path ? "active" : "";

  const handleLogout = () => {
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  return (
    <header className="header-admin">
      {/* Logo */}
      <Link to="/admin" className="header-admin-logo">
        <img src="/Imagenes_Invitado/Logo.png" alt="Logo" />
        <span className="header-admin-logo-texto">Panel Admin</span>
      </Link>

      {/* Nav */}
      <nav className="header-admin-nav">
        <ul>
          <li><Link to="/admin" className={isActive("/admin")}>Dashboard</Link></li>
          <li><Link to="/admin/alumnos" className={isActive("/admin/alumnos")}>Alumnos</Link></li>
          <li><Link to="/admin/horarios" className={isActive("/admin/horarios")}>Horarios</Link></li>
          <li><Link to="/admin/pagos" className={isActive("/admin/pagos")}>Pagos</Link></li>
          <li><Link to="/admin/asistencia" className={isActive("/admin/asistencia")}>Asistencia</Link></li>
          <li><Link to="/admin/noticias" className={isActive("/admin/noticias")}>Noticias</Link></li>
          <li><Link to="/admin/tienda" className={isActive("/admin/tienda")}>Tienda</Link></li>
        </ul>
      </nav>

      {/* Perfil */}
      <div className="header-admin-perfil">
        <span className="header-admin-badge">ADMIN</span>
        <span className="header-admin-nombre">{usuario.nombre}</span>
        <div className="header-admin-avatar">{inicial}</div>
        <button className="header-admin-logout" onClick={handleLogout}>Salir</button>
      </div>
    </header>
  );
};

export default HeaderAdmin;
