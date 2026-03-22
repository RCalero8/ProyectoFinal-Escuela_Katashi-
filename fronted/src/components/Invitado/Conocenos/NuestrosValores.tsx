import React from "react";
import "../../../style/Invitado/Conocenos/NuestrosValores.css";

const valores = [
  {
    emoji: "🥋",
    color: "#ef4444",
    nombre: "Karate Tradicional",
    desc: "Enseñanza de técnicas y valores tradicionales del karate-do auténtico.",
  },
  {
    emoji: "🏆",
    color: "#eab308",
    nombre: "Competición y Superación",
    desc: "Participación en torneos locales y provinciales. Fomentamos el espíritu competitivo sano.",
  },
  {
    emoji: "🧘",
    color: "#22c55e",
    nombre: "Desarrollo Físico y Mental",
    desc: "Para niños, jóvenes y adultos. Mejora tu condición física y fortalece tu mente.",
  },
  {
    emoji: "👨‍🏫",
    color: "#374151",
    nombre: "Instructores Certificados",
    desc: "Senseis con amplia experiencia y títulos oficiales. Profesionales dedicados a tu progreso.",
  },
];
 
const NuestrosValores: React.FC = () => {
  return (
    <section className="valores-section">
      <div className="valores-inner">
 
        <div className="valores-header">
          <h2 className="valores-titulo">Nuestros Valores</h2>
          <p className="valores-subtitulo">
            Los pilares que sustentan nuestra filosofía de enseñanza
          </p>
        </div>
 
        <div className="valores-grid">
          {valores.map((v) => (
            <div className="valor-card" key={v.nombre}>
              <div
                className="valor-icono"
                style={{ backgroundColor: v.color }}
              >
                {v.emoji}
              </div>
              <p className="valor-nombre">{v.nombre}</p>
              <p className="valor-desc">{v.desc}</p>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default NuestrosValores;