import React, { useEffect, useState } from 'react';
import { type Curso } from '../../../tipos/cursos';
import { configCurso } from '../../../tipos/configCurso';
import '../../../style/Invitado/Clases/Cursos.css';

// --- COMPONENTE HIJO: CursoCard ---
const CursoCard: React.FC<{ curso: Curso }> = ({ curso }) => {
  const info = configCurso[curso.nombre];
  const color = info?.color || "#666666";

  return (
    <div className="curso-card" style={{ borderColor: color }}>
      <div className="curso-img-side">
        <img src={`/img/${curso.nombre.toLowerCase()}.jpg`} alt={curso.nombre} />
      </div>
      <div className="curso-info-side">
        <div className="curso-header">
          <h2 style={{ color: color }}>
            {curso.nombre} <span className="rango-texto">{info?.rangoTexto}</span>
          </h2>
          <p className="descripcion">{curso.descripcion}</p>
          <p className="horario">Lunes y Miércoles — 17:00 a 18:00</p>
          <div className="precio-tag" style={{ backgroundColor: color }}>
            {info?.precio}
          </div>
        </div>
        <div className="btn-group">
          <button className="btn-inscribir">Inscribirme</button>
          <button className="btn-info">Más Información</button>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PADRE: Cursos ---
const Cursos: React.FC = () => {
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [edadBuscada, setEdadBuscada] = useState<string>("");

  useEffect(() => {
    // Usamos el fetch nativo del navegador
    fetch('https://proyectofinal-escuela-katashi.onrender.com/api/cursos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la red');
        }
        return response.json();
      })
      .then(data => setCursos(data))
      .catch(err => console.error("Error cargando API:", err));
  }, []);
  const cursosFiltrados = cursos.filter(curso => {
    if (edadBuscada === "") return true;
    const edad = parseInt(edadBuscada);
    const config = configCurso[curso.nombre];
    return config ? (edad >= config.minEdad && edad <= config.maxEdad) : true;
  });

  return (
    <div className="cursos-container">
      <nav className="navbar-busqueda">
        <div className="buscador-wrapper">
          <input 
            type="number" 
            placeholder="Edad"
            value={edadBuscada}
            onChange={(e) => setEdadBuscada(e.target.value)}
          />
          <span className="icon-lupa">🔍</span>
        </div>
      </nav>

      <main className="lista-wrapper">
        {cursosFiltrados.length > 0 ? (
          cursosFiltrados.map(curso => (
            <CursoCard key={curso.id_curso} curso={curso} />
          ))
        ) : (
          <p className="loading-text">Cargando cursos desde la escuela...</p>
        )}
      </main>
    </div>
  );
};

export default Cursos;