import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../style/Usuario/MIs_Clases/proximasclases.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const DIAS_SEMANA = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

interface Horario {
  id_horario: number;
  dia: string;
  hora: string;
  tipo_clase: string;
  dojo: string;
  sensei_nombre: string;
  sensei_apellido: string;
}

const getBadgeClase = (tipo: string) => {
  const t = tipo.toLowerCase();
  if (t.includes("infantil"))    return "infantil";
  if (t.includes("adulto"))      return "adultos";
  if (t.includes("técnico") || t.includes("tecnico")) return "tecnico";
  if (t.includes("competici"))   return "competicion";
  return "default";
};

const ProximasClases: React.FC = () => {
  const navigate  = useNavigate();
  const usuario   = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (usuario?.id_usuario) {
      fetch(`${API_URL}/api/horario/${usuario.id_usuario}`)
        .then(r => r.json())
        .then(data => { setHorarios(data); setLoading(false); })
        .catch(() => setLoading(false));
    }
  }, []);

  // Determinar la próxima clase
  const getProximaId = () => {
    const ahora      = new Date();
    const diaActual  = ahora.getDay();
    const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

    const proxima = [...horarios].sort((a, b) => {
      const diaA = DIAS_SEMANA.indexOf(a.dia);
      const diaB = DIAS_SEMANA.indexOf(b.dia);
      return ((diaA - diaActual + 7) % 7) - ((diaB - diaActual + 7) % 7);
    }).find(h => {
      const diaH = DIAS_SEMANA.indexOf(h.dia);
      const diff = (diaH - diaActual + 7) % 7;
      if (diff > 0) return true;
      const [hH, mH] = h.hora.split(":").map(Number);
      return (hH * 60 + mH) > horaActual;
    });

    return proxima?.id_horario;
  };

  const proximaId = getProximaId();

  const formatHora = (hora: string) => hora.slice(0, 5);

  return (
    <div className="proximas-clases">
      <div className="proximas-clases-inner">
        <h2 className="proximas-clases-titulo">📅 Próximas clases</h2>

        {loading ? (
          <p style={{ color: "#6b7280", fontSize: 14 }}>Cargando...</p>
        ) : horarios.length === 0 ? (
          <p style={{ color: "#6b7280", fontSize: 14 }}>No tienes clases asignadas.</p>
        ) : (
          <table className="proximas-clases-tabla">
            <thead>
              <tr>
                <th>Día</th>
                <th>Hora</th>
                <th>Tipo de clase</th>
                <th>Dojo</th>
                <th>Sensei</th>
              </tr>
            </thead>
            <tbody>
              {horarios.map((h) => (
                <tr key={h.id_horario} className={h.id_horario === proximaId ? "proxima" : ""}>
                  <td>{h.dia}</td>
                  <td>{formatHora(h.hora)}</td>
                  <td>
                    <span className={`clase-badge ${getBadgeClase(h.tipo_clase)}`}>
                      {h.tipo_clase}
                    </span>
                  </td>
                  <td>{h.dojo}</td>
                  <td>
                    {h.sensei_nombre
                      ? `Sensei ${h.sensei_nombre} ${h.sensei_apellido}`
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <button className="proximas-clases-btn" onClick={() => navigate("/usuario/clases")}>
          Ver horario completo
        </button>
      </div>
    </div>
  );
};

export default ProximasClases;