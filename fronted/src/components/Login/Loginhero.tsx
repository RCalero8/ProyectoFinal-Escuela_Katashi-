import React, { useState } from 'react';
import '../../style/Login/Logins.css';

// URL de la API proporcionada por el usuario
const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const Logins: React.FC = () => {
  // Estados para Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  // Estados para Recuperación
  const [recoveryEmail, setRecoveryEmail] = useState('');

  // Manejar el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, contrasena: loginPass })
      });

      const data = await response.json();

      if (response.ok) {
        alert(`¡Bienvenido ${data.usuario.nombre}! Has iniciado sesión como ${data.usuario.rol}.`);
        // Aquí podrías redirigir según el rol:
        // if (data.usuario.rol === 'ADMINISTRADOR') window.location.href = '/admin';
        // else window.location.href = '/panel-usuario';
      } else {
        alert(data.error || 'Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  // Manejar la recuperación de contraseña
  const handleRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/api/auth/recuperar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: recoveryEmail })
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje);
      } else {
        alert(data.error || 'Error al procesar la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión con el servidor');
    }
  };

  return (
    <div className="login-page">
      {/* Cabecera */}
      <header className="login-header">
        <img src="https://cdn-icons-png.flaticon.com/512/1162/1162499.png" alt="Logo" className="login-header__logo" />
        <h1 className="login-header__title">Escuela de Karate Katashi</h1>
      </header>

      {/* Banner */}
      <section className="login-banner">
        <div className="login-banner__content">
          <h2 className="login-banner__title">Inicia sesión en tu cuenta</h2>
          <p className="login-banner__subtitle">
            Accede a tu panel personal para consultar tus clases, pagos y novedades del dojo.
          </p>
        </div>
      </section>

      {/* Contenido Principal */}
      <main className="login-main">
        {/* Sección Login */}
        <section className="login-section">
          <h3 className="login-section__title">Login</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                placeholder="email@gmail.com" 
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Contraseña:</label>
              <input 
                type="password" 
                placeholder="**********" 
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                required
              />
            </div>
            <div className="form-options">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Recordarme en este dispositivo</label>
            </div>
            <div className="form-footer">
              <p className="form-footer__text">
                Si aún no tienes cuenta, puedes registrarte y empezar tu entrenamiento hoy. Regístrate <a href="/registro">aquí</a>
              </p>
              <button type="submit" className="btn-primary">Iniciar Sesión</button>
            </div>
          </form>

          <div className="social-login">
            <button className="btn-social">Continuar con Google</button>
            <button className="btn-social">Continuar con Facebook</button>
            <button className="btn-social">Continuar con Apple</button>
          </div>
        </section>

        {/* Sección Recuperación */}
        <section className="recovery-section">
          <h3 className="login-section__title">Has olvidado tu contraseña</h3>
          <p className="recovery-text">
            Si no recuerdas tu contraseña, introduce tu correo electrónico y te enviaremos un enlace para recuperarla.
          </p>
          <form onSubmit={handleRecovery}>
            <div className="form-group">
              <label>Email:</label>
              <input 
                type="email" 
                placeholder="email@gmail.com" 
                value={recoveryEmail}
                onChange={(e) => setRecoveryEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">Recuperar contraseña</button>
          </form>
        </section>
      </main>
    </div>
  );
};

export default Logins;