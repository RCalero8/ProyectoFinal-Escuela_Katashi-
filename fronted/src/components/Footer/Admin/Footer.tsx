import React from "react";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer-admin">
      <span className="footer-admin-texto">
        © 2025 Escuela de Karate Katashi -- Panel de Administración
      </span>
      <div className="footer-admin-links">
        <a href="#">Aviso legal</a>
        <a href="#">Política de privacidad</a>
        <a href="#">Soporte</a>
      </div>
    </footer>
