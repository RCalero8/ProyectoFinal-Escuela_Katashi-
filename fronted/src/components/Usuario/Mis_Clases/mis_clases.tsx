import React, { useEffect, useState } from "react";
import "../../../style/Usuario/MIs_Clases/mis_clases.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

interface Horario {
  id_horario: number;
  dia: string;
  hora: string;
  tipo_clase: string;
  dojo: string;
}

interface Asistencia {
  id_asistencia: number;
  presente: boolean;
}

const MisClases: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [horarios, setHorarios]       = useState<Horario[]>([]);
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);

  useEffect(() => {
    if (usuario?.id_usuario) {
      fetch(`${API_URL}/api/horario/${usuario.id_usuario}`)
        .then(r => r.json())
        .then(data => setHorarios(Array.isArray(data) ? data : []))
        .catch(() => {});

      fetch(`${API_URL}/api/asistencia/${usuario.id_usuario}`)
        .then(r => r.json())
        .then(data => setAsistencias(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  }, []);

  const clasesActivas = horarios.length;

  const proximasSemana = () => {
    const ahora      = new Date();
    const diaActual  = ahora.getDay();
    const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

    return horarios.filter(h => {
      const diaH = DIAS_SEMANA.indexOf(h.dia);
      const diff = (diaH - diaActual + 7) % 7;
      if (diff === 0) {
        const [hH, mH] = h.hora.split(":").map(Number);
        return (hH * 60 + mH) > horaActual;
      }
      return diff > 0 && diff <= (6 - diaActual);
    }).length;
  };

  const totalAsistencias = asistencias.filter(a => a.presente).length;

  return (
    <div className="misclases-header">
      <div className="misclases-header-inner">

        <h1 className="misclases-titulo">🥋 Mis Clases</h1>
        <p className="misclases-subtitulo">
          Consulta tus horarios, senseis asignados y estado de asistencia.
        </p>

        <div className="misclases-stats">
          <div className="misclases-stat-card">
            <span className="misclases-stat-emoji">📖</span>
            <div className="misclases-stat-info">
              <span className="misclases-stat-numero">{clasesActivas}</span>
              <span className="misclases-stat-label">Clases activas</span>
            </div>
          </div>

          <div className="misclases-stat-card">
            <span className="misclases-stat-emoji">📅</span>
            <div className="misclases-stat-info">
              <span className="misclases-stat-numero">{proximasSemana()}</span>
              <span className="misclases-stat-label">Próximas clases esta semana</span>
            </div>
          </div>

          <div className="misclases-stat-card">
            <span className="misclases-stat-emoji">⏱️</span>
            <div className="misclases-stat-info">
              <span className="misclases-stat-numero">{totalAsistencias}</span>
              <span className="misclases-stat-label">Historial de asistencia</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MisClases;
