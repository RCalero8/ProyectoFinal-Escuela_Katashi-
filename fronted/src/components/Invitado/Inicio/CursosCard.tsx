import React from "react";
import type { Curso } from "../../../tipos/cursos";
import { cursoMeta } from "../../../tipos/cursoMeta";
import "../../../style/Invitado/Inicio/CursoCard.css";

interface Props {
    curso: Curso;
}

const CourseCard: React.FC<Props> = ({ curso }) => {
  const meta = cursoMeta[curso.nombre];

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
            <strong>Horario:</strong> {curso.horario}
          </span>
          <span>
            <strong>Fechas:</strong> {curso.f_inicio} – {curso.f_fin}
          </span>

          {curso.clases.map((clase) => (
            <span key={clase.id_clase}>
              <strong>Grado:</strong> {clase.grado} · {clase.duracion_min} min
            </span>
          ))}
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