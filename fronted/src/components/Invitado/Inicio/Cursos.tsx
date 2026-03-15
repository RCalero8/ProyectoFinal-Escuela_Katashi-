import React, { useEffect, useState } from "react";
import type { Curso } from "../../../tipos/cursos";
import CourseCard from "./CursosCard";

const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/api/cursos")
      .then((res) => res.json())
      .then((data: Curso[]) => {
        setCursos(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ color: "white" }}>Cargando cursos...</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1f2937, #020617)",
        padding: "40px 16px",
        color: "white",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>
            Nuestros Cursos
          </h1>
          <p style={{ maxWidth: 520, fontSize: 15, opacity: 0.9 }}>
            Ofrecemos clases adaptadas a todas las edades y niveles.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 24,
          }}
        >
          {cursos.map((curso) => (
            <CourseCard key={curso.id_curso} curso={curso} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cursos;
