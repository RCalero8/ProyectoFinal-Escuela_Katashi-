import React, { useEffect, useState } from "react";
import type { Curso } from "../../../tipos/cursos";
import CourseCard from "./CursosCard";

const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://proyectofinal-escuela-katashi.onrender.com/api/cursos`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(async (data: Curso[]) => {
        const cursosConClases = await Promise.all(
          data.map((curso) =>
            fetch(`https://proyectofinal-escuela-katashi.onrender.com/api/cursos/${curso.id_curso}`)
              .then((r) => r.json())
              .catch(() => ({ ...curso, clases: [] }))
          )
        );
        setCursos(cursosConClases);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div style={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
        <p style={{ fontSize: 16, color: "#6b7280" }}>Cargando cursos...</p>
      </div>
    );

  if (error)
    return (
      <div style={{ width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb" }}>
        <p style={{ fontSize: 16, color: "#ef4444" }}>No se pudieron cargar los cursos. Inténtalo más tarde.</p>
      </div>
    );

  return (
    <div
      id="cursos"
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "#f9fafb",
        padding: "48px 24px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ width: "100%", margin: "0" }}>

        {/* Cabecera */}
        <header style={{ marginBottom: 32 }}>
          <h1 style={{
            fontSize: 36,
            fontWeight: 800,
            marginBottom: 8,
            fontFamily: "'Georgia', serif",
            color: "#b8860b",
            fontStyle: "italic",
          }}>
            Nuestros Cursos
          </h1>
          <p style={{ fontSize: 15, color: "#374151", width: "100%" }}>
            Ofrecemos clases adaptadas a todas las edades y niveles. Encuentra el grupo perfecto para ti.
          </p>
        </header>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 20,
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