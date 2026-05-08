import React from "react";
import "../../../style/Usuario/MIs_Clases/modal_horario.css";

const DIAS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
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

interface Props {
  horarios: Horario[];
  onCerrar: () => void;
}

const ModalHorario: React.FC<Props> = ({ horarios, onCerrar }) => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  // Próxima clase
  const getProximaId = () => {
    const ahora      = new Date();
    const diaActual  = ahora.getDay();
    const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

    return [...horarios].sort((a, b) => {
      const diaA = DIAS_SEMANA.indexOf(a.dia);
      const diaB = DIAS_SEMANA.indexOf(b.dia);
      return ((diaA - diaActual + 7) % 7) - ((diaB - diaActual + 7) % 7);
    }).find(h => {
      const diaH = DIAS_SEMANA.indexOf(h.dia);
      const diff = (diaH - diaActual + 7) % 7;
      if (diff > 0) return true;
      const [hH, mH] = h.hora.split(":").map(Number);
      return (hH * 60 + mH) > horaActual;
    })?.id_horario;
  };

  const proximaId = getProximaId();
  const formatHora = (hora: string) => hora.slice(0, 5);

  return (
    <div className="modal-horario-backdrop" onClick={onCerrar}>
      <div className="modal-horario" onClick={e => e.stopPropagation()}>

        {/* Cabecera */}
        <div className="modal-horario-header">
          <div className="modal-horario-header-info">
            <h2 className="modal-horario-titulo">📅 Mi Horario Semanal</h2>
            <p className="modal-horario-nombre">
              {usuario.nombre} {usuario.apellido}
            </p>
          </div>
          <button className="modal-horario-cerrar" onClick={onCerrar}>✕</button>
        </div>

        {/* Cuerpo */}
        <div className="modal-horario-body">
          <div className="modal-horario-semana">
            {DIAS.map(dia => {
              const clasesDelDia = horarios.filter(h => h.dia === dia);
              return (
                <div className="modal-horario-dia-col" key={dia}>
                  <div className="modal-horario-dia-nombre">{dia}</div>
                  {clasesDelDia.length === 0 ? (
                    <div className="modal-horario-dia-vacio">
                      <span>—</span>
                    </div>
                  ) : (
                    clasesDelDia.map(h => (
                      <div
                        key={h.id_horario}
                        className={`modal-horario-clase-card ${h.id_horario === proximaId ? "proxima" : ""}`}
                      >
                        <span className="modal-horario-clase-hora">{formatHora(h.hora)}</span>
                        <span className="modal-horario-clase-tipo">{h.tipo_clase}</span>
                        <span className="modal-horario-clase-dojo">{h.dojo}</span>
                        {h.sensei_nombre && (
                          <span className="modal-horario-clase-sensei">
                            Sensei {h.sensei_nombre}
                          </span>
                        )}
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>

          {/* Leyenda */}
          <div className="modal-horario-leyenda">
            <div className="modal-horario-leyenda-item">
              <div className="modal-horario-leyenda-dot" style={{ background: "#cc0000" }} />
              Clase programada
            </div>
            <div className="modal-horario-leyenda-item">
              <div className="modal-horario-leyenda-dot" style={{ background: "#b8860b" }} />
              Próxima clase
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ModalHorario;
