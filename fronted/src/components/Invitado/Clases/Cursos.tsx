import React, { useEffect, useState } from 'react';
import { type Curso } from '../../../tipos/cursos';
import { configCurso } from '../../../tipos/configCurso';
import '../../../style/Invitado/Clases/Cursos.css';

// --- COMPONENTE HIJO: CursoCard ---
const CursoCard: React.FC<{ curso: Curso }> = ({ curso }) => {
  const info = configCurso[curso.nombre];
  const color = info?.color || "#666666";
  
  // Usamos la URL de imagen de la configuración, o una por defecto si no existe
  const imagenUrl = info?.imagen || `https://via.placeholder.com/400x300?text=${curso.nombre}`;

  // Verificar si el usuario está autenticado
  const usuarioAutenticado = localStorage.getItem('usuarioAutenticado') === 'true';

  const handleInscribir = () => {
    if (!usuarioAutenticado) {
      alert('¡Debes registrarte para poder inscribirte a un curso!');
      return;
    }
    // Aquí irá la lógica de inscripción real
    console.log('Inscribiéndose en:', curso.nombre);
  };

  return (
    <div className="curso-card" style={{ borderColor: color }}>
      <div className="curso-img-side">
        {/* Cambiado para usar la imagen de la configuración */}
        <img src={imagenUrl} alt={curso.nombre} />
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
          <button 
            className="btn-inscribir" 
            onClick={handleInscribir}
            disabled={!usuarioAutenticado}
            style={{ opacity: usuarioAutenticado ? 1 : 0.6, cursor: usuarioAutenticado ? 'pointer' : 'not-allowed' }}
          >
            Inscribirme
          </button>
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
          <p className="loading-text">
            {cursos.length === 0 ? "Cargando cursos..." : "No hay cursos para esa edad."}
          </p>
        )}
      </main>
    </div>
  );
};

export default Cursos;