import React from "react";
import type { Curso } from "../../../tipos/cursos";
import { cursoMeta } from "../../../tipos/cursoMeta";
import "../../../style/Invitado/Inicio/CursoCard.css";
 
interface Props {
  curso: Curso;
}
 
// Formatea "2024-01-15T00:00:00.000Z" → "15/01/2024"
function formatFecha(fecha: string): string {
  if (!fecha) return "—";
  const d = new Date(fecha);
  if (isNaN(d.getTime())) return fecha;
  return d.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
 
const CourseCard: React.FC<Props> = ({ curso }) => {
  // Protección: si el nombre no está en cursoMeta usamos valores por defecto
  const meta = cursoMeta[curso.nombre] ?? {
    emoji: "🥋",
    imagen: "/Imagenes_Invitado/Inicio/clases/default.jpg",
    color: "#6b7280",
  };
 
  const clases = curso.clases ?? [];
 
  return (
    <div className="course-card">
      <div className="course-card-img">
        <img src={meta.imagen} alt={curso.nombre} />
        <div className="course-card-badge">
          <span>{meta.emoji}</span>
          <span style={{ fontSize: 12, textTransform: "uppercase" }}>
            {curso.nombre}
          </span>
        </div>
      </div>
 
      <div className="course-card-content">
        <p className="course-card-desc">{curso.descripcion}</p>
 
        <div className="course-card-info">
          <span>
            <strong>Inicio:</strong> {formatFecha(curso.f_inicio)}
          </span>
          <span>
            <strong>Fin:</strong> {formatFecha(curso.f_fin)}
          </span>
 
          {clases.length > 0 && (
            <>
              <span style={{ marginTop: 4, fontWeight: 600, opacity: 0.7, fontSize: 11, textTransform: "uppercase" }}>
                Clases
              </span>
              {clases.map((clase) => (
                <span key={clase.id_clase}>
                  <strong>Grado:</strong> {clase.grado} · {clase.duracion_min} min
                </span>
              ))}
            </>
          )}
        </div>
 
        <button
          className="course-card-btn"
          style={{
            backgroundColor: meta.color,
            color: meta.color === "#111827" ? "white" : "#020617",
          }}
        >
          Más información
        </button>
      </div>
    </div>
  );
};
 
export default CourseCard;