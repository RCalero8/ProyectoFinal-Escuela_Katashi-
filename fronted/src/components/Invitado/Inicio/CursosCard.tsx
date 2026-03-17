import React from "react";
import type { Curso } from "../../../tipos/cursos";
import { cursoMeta } from "../../../tipos/cursoMeta";
import "../../../style/Invitado/Inicio/CursoCard.css";

interface Props {
  curso: Curso;
}

const CourseCard: React.FC<Props> = ({ curso }) => {
  const meta = cursoMeta[curso.nombre] ?? {
    emoji: "🥋",
    imagen: "/Imagenes_Invitado/Inicio/clases/default.jpg",
    color: "#6b7280",
    horario: "—",
  };

  const clases = curso.clases ?? [];

  // Juntamos todos los grados en una sola línea: "4-6 años · 7-9 años"
  const edades = clases.map((c) => c.grado).join(" · ");

  return (
    <div className="course-card">
      {/* Imagen con overlay */}
      <div className="course-card-img">
        <img src={meta.imagen} alt={curso.nombre} />
        <div className="course-card-overlay">
          <div className="course-card-title-block">
            <span className="course-card-nombre">{curso.nombre.toUpperCase()}</span>
            {edades && <span className="course-card-edades">{edades}</span>}
          </div>
          <span className="course-card-emoji">{meta.emoji}</span>
        </div>
      </div>

      {/* Pie de card */}
      <div className="course-card-footer">
        <span className="course-card-horario">{meta.horario}</span>
        <button
          className="course-card-btn"
          style={{ backgroundColor: meta.color }}
        >
          Más información
        </button>
      </div>
    </div>
  );
};

export default CourseCard;