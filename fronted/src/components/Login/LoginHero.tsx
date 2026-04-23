import React from "react";
import "../../style/Login/LoginHero.css";

const LoginHero: React.FC = () => {
    return (
        <div className="login-hero">
            <div className="login-hero-content">
                <h1 className="login-hero-titulo">Inicia Sesión en tu cuenta</h1>
                <p className="login-hero-subtitulo">
                    Accede a tu panel para consultar tus clases, pagos y novedades del dojo.
                </p>
            </div>
        </div>
    );
};

export default LoginHero;