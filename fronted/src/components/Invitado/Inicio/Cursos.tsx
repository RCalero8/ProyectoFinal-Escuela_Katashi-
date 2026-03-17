import React, { useEffect, useState } from "react";
import type { Curso } from "../../../tipos/cursos";
import CourseCard from "./CursosCard";
 
const API_URL = "https://proyectofinal-escuelakatashi-production.up.railway.app";
 
const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(false);
 
  useEffect(() => {
    // 1. Traemos el listado de cursos
    fetch(`${API_URL}/api/cursos`)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta");
        return res.json();
      })
      .then(async (data: Curso[]) => {
        // 2. Por cada curso pedimos el detalle (incluye clases)
        const cursosConClases = await Promise.all(
          data.map((curso) =>
            fetch(`${API_URL}/api/cursos/${curso.id_curso}`)
              .then((r) => r.json())
              .catch(() => ({ ...curso, clases: [] })) // si falla un detalle no rompemos todo
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
      <div style={{ minHeight: "100vh", background: "radial-gradient(circle at top, #1f2937, #020617)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18 }}>
        Cargando cursos...
      </div>
    );
 
  if (error)
    return (
      <div style={{ minHeight: "100vh", background: "radial-gradient(circle at top, #1f2937, #020617)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", fontSize: 18 }}>
        No se pudieron cargar los cursos. Inténtalo más tarde.
      </div>
    );
 
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1f2937, #020617)",
        padding: "40px 16px",
        color: "white",
        boxSizing: "border-box",
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
