import React from "react";
import "../../../style/Usuario/Federacion/Avisos.css";

interface Federacion {
  f_renovacion: string;
}

interface Props {
  ficha?: Federacion;
}

const AvisosFederacion: React.FC<Props> = ({ ficha }) => {

  const diasParaRenovar = () => {
    if (!ficha?.f_renovacion) return null;
    const diff = Math.ceil(
      (new Date(ficha.f_renovacion).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return diff;
  };

  const dias = diasParaRenovar();
  const mostrarAviso = dias !== null && dias <= 60;

  return (
    <div className="avisos-section">
      <div className="avisos-inner">
        <h2 className="avisos-titulo">⚠️ Avisos importantes</h2>
        <p className="avisos-subtitulo">Mantente al día con notificaciones relevantes</p>

        <div className="avisos-lista">

          {/* Aviso licencia próxima a caducar */}
          {mostrarAviso && (
            <div className="aviso-card amarillo">
              <div className="aviso-card-header">
                <span className="aviso-card-emoji">⚠️</span>
                <p className="aviso-card-titulo">Tu licencia caduca pronto</p>
              </div>
              <p className="aviso-card-texto">
                Tu licencia federativa caducará el{" "}
                {new Date(ficha!.f_renovacion).toLocaleDateString("es-ES")}.
                Te recomendamos renovarla con 15 días de antelación para evitar interrupciones.
              </p>
              <button className="aviso-btn">Renovar ahora</button>
            </div>
          )}

          {/* Aviso documentación pendiente */}
          <div className="aviso-card azul">
            <div className="aviso-card-header">
              <span className="aviso-card-emoji">ℹ️</span>
              <p className="aviso-card-titulo">Documentación pendiente</p>
            </div>
            <p className="aviso-card-texto">
              Recuerda entregar la autorización médica antes del 01/12/2025 para
              poder participar en competiciones oficiales.
            </p>
          </div>

          {/* Recomendaciones */}
          <div className="aviso-card claro">
            <div className="aviso-card-header">
              <span className="aviso-card-emoji">💡</span>
              <p className="aviso-card-titulo">Recomendaciones federativas</p>
            </div>
            <ul className="aviso-card-lista">
              <li>Mantén tus datos personales actualizados en el perfil federativo.</li>
              <li>Consulta los reglamentos antes de participar en competiciones oficiales.</li>
              <li>Guarda siempre copias digitales de tus certificados y licencias.</li>
              <li>Revisa tu correo electrónico regularmente para recibir comunicaciones oficiales.</li>
              <li>Renueva tu licencia con antelación para evitar problemas administrativos.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AvisosFederacion;
