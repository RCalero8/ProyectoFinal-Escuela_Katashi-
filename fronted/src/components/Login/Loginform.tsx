import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../style/Login/LoginForm.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const LoginForm: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [recordar, setRecordar]     = useState(false);
  const [error, setError]           = useState("");

  const [emailRec, setEmailRec]     = useState("");
  const [msgRec, setMsgRec]         = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, contrasena: password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Credenciales incorrectas");
        return;
      }
      localStorage.setItem("usuario", JSON.stringify(data));
      if (data.tipo_usuario === "ADMINISTRADOR") {
        navigate("/admin");
      } else {
        navigate("/cliente");
      }
    } catch {
      setError("Error de conexión. Inténtalo más tarde.");
    }
  };

  const handleRecuperar = (e: React.FormEvent) => {
    e.preventDefault();
    setMsgRec("Si el correo está registrado, recibirás un enlace en breve.");
    setEmailRec("");
  };

  return (
    <div className="login-body">
      <div className="login-body-inner">

        {/* ── Login ── */}
        <div>
          <h2 className="login-titulo">Login</h2>

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label className="login-field-label">Email:</label>
              <input
                className="login-input"
                type="email"
                placeholder="email@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="login-field">
              <label className="login-field-label">Contraseña:</label>
              <input
                className="login-input"
                type="password"
                placeholder="••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <label className="login-recordar">
              <input
                type="checkbox"
                checked={recordar}
                onChange={(e) => setRecordar(e.target.checked)}
              />
              Recordarme en este dispositivo
            </label>

            <p className="login-registro-texto">
              Si aún no tienes cuenta, puedes registrarte y empezar tu entrenamiento hoy.
              Regístrate <a onClick={() => navigate("/registro")}>aquí</a>
            </p>

            {error && (
              <p style={{ color: "#cc0000", fontSize: 13, marginBottom: 8 }}>{error}</p>
            )}

            <button type="submit" className="login-btn-submit">
              Iniciar Sesión
            </button>
          </form>

          {/* Botones sociales */}
          <div className="login-sociales">
            <button className="login-btn-social">Continuar con Google</button>
            <button className="login-btn-social">Continuar con Facebook</button>
            <button className="login-btn-social">Continuar con Apple</button>
          </div>
        </div>

        {/* ── Recuperar contraseña ── */}
        <div>
          <h2 className="login-recuperar-titulo">Has olvidado tu contraseña</h2>
          <p className="login-recuperar-texto">
            Si no recuerdas tu contraseña, introduce tu correo electrónico y te
            enviaremos un enlace para recuperarla.
          </p>

          <form onSubmit={handleRecuperar}>
            <div className="login-field">
              <label className="login-field-label">Email:</label>
              <input
                className="login-input"
                type="email"
                placeholder="email@gmail.com"
                value={emailRec}
                onChange={(e) => setEmailRec(e.target.value)}
                required
              />
            </div>

            {msgRec && (
              <p style={{ color: "#16a34a", fontSize: 13, margin: "8px 0" }}>{msgRec}</p>
            )}

            <button type="submit" className="login-btn-recuperar">
              Recuperar contraseña
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default LoginForm;