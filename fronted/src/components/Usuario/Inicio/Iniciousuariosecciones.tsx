import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style/Usuario/Inicio/Iniciousuariosecciones.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Noticia {
  id: number;
  titulo: string;
  imagen?: string;
}

interface Horario {
  id_horario: number;
  dia: string;
  hora: string;
  tipo_clase: string;
  dojo: string;
}

const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

const InicioUsuarioSecciones: React.FC = () => {
  const navigate  = useNavigate();
  const usuario   = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [noticias, setNoticias]   = useState<Noticia[]>([]);
  const [horarios, setHorarios]   = useState<Horario[]>([]);

  useEffect(() => {
    // Cargar noticias
    fetch(`${API_URL}/api/noticias?limite=2`)
      .then(r => r.json())
      .then(setNoticias)
      .catch(() => {});

    // Cargar horarios del usuario
    if (usuario?.id_usuario) {
      fetch(`${API_URL}/api/horario/${usuario.id_usuario}`)
        .then(r => r.json())
        .then(setHorarios)
        .catch(() => {});
    }
  }, []);

  // Determinar la próxima clase
  const getProximaClase = () => {
    const ahora     = new Date();
    const diaActual = ahora.getDay(); // 0=Dom, 1=Lun...
    const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

    // Ordenar horarios por día de la semana relativo al día actual
    const ordenados = [...horarios].sort((a, b) => {
      const diaA = DIAS_SEMANA.indexOf(a.dia);
      const diaB = DIAS_SEMANA.indexOf(b.dia);
      const diffA = (diaA - diaActual + 7) % 7;
      const diffB = (diaB - diaActual + 7) % 7;

      if (diffA !== diffB) return diffA - diffB;

      const [hA, mA] = a.hora.split(":").map(Number);
      const [hB, mB] = b.hora.split(":").map(Number);
      return (hA * 60 + mA) - (hB * 60 + mB);
    });

    // Si el día es hoy, comprobar si ya pasó la hora
    return ordenados.find(h => {
      const diaH = DIAS_SEMANA.indexOf(h.dia);
      const diff = (diaH - diaActual + 7) % 7;
      if (diff > 0) return true;
      const [hH, mH] = h.hora.split(":").map(Number);
      return (hH * 60 + mH) > horaActual;
    }) || ordenados[0];
  };

  const proximaClase = getProximaClase();

  const formatHora = (hora: string) => hora.slice(0, 5);

  return (
    <>
      {/* ── Últimas noticias ── */}
      <section className="usuario-noticias">
        <div className="usuario-noticias-inner">
          <h2 className="usuario-seccion-titulo">🗞️ Últimas noticias del dojo</h2>

          <div className="usuario-noticias-grid">
            {noticias.map((n) => (
              <div
                className="usuario-noticia-card"
                key={n.id}
                onClick={() => navigate(`/noticias/${n.id}`)}
              >
                <img
                  src={n.imagen || "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80"}
                  alt={n.titulo}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&q=80";
                  }}
                />
                <div className="usuario-noticia-overlay">
                  <p className="usuario-noticia-titulo">{n.titulo}</p>
                  <button className="usuario-noticia-btn">Leer Más</button>
                </div>
              </div>
            ))}
          </div>

          <button className="usuario-ver-mas-btn" onClick={() => navigate("/noticias")}>
            Ver Más
          </button>
        </div>
      </section>

      {/* ── Próximas clases ── */}
      <section className="usuario-clases">
        <div className="usuario-clases-inner">
          <h2 className="usuario-seccion-titulo">📅 Tus próximas clases</h2>

          <div className="usuario-clases-lista">
            {horarios.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: 14 }}>No tienes clases asignadas.</p>
            ) : (
              horarios.map((h) => (
                <div
                  key={h.id_horario}
                  className={`usuario-clase-item ${proximaClase?.id_horario === h.id_horario ? "proxima" : ""}`}
                >
                  <span className="usuario-clase-dia">{h.dia} {formatHora(h.hora)}</span>
                  {" — "}{h.tipo_clase}{" — "}{h.dojo}
                  {proximaClase?.id_horario === h.id_horario && " ⬅ próxima"}
                </div>
              ))
            )}
          </div>

          <button className="usuario-horario-btn" onClick={() => navigate("/usuario/clases")}>
            Ver horario completo
          </button>
        </div>
      </section>
    </>
  );
};

export default InicioUsuarioSecciones;
