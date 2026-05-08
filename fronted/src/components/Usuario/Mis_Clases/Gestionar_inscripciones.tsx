import React, { useEffect, useState } from "react";
import "../../../style/Usuario/MIs_Clases/Gestionar_inscripciones.css"

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Curso {
  id_curso: number;
  nombre: string;
  descripcion: string;
  inscritos: number;
}

interface Inscripcion {
  codigo: number;
  id_curso: number;
  estado: string;
  curso_nombre: string;
  dia: string;
  hora: string;
  dojo: string;
}

const FILTROS = ["Todos", "Infantil", "Adultos", "Tecnificación"];

const GestionarInscripciones: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [cursos, setCursos]               = useState<Curso[]>([]);
  const [inscripciones, setInscripciones] = useState<Inscripcion[]>([]);
  const [filtro, setFiltro]               = useState("Todos");
  const [loading, setLoading]             = useState(true);

  const cargarDatos = () => {
    fetch(`${API_URL}/api/inscripciones/cursos/disponibles`)
      .then(r => r.json())
      .then(data => setCursos(Array.isArray(data) ? data : []))
      .catch(() => {});

    if (usuario?.id_usuario) {
      fetch(`${API_URL}/api/inscripciones/${usuario.id_usuario}`)
        .then(r => r.json())
        .then(data => {
          setInscripciones(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  };

  useEffect(() => { cargarDatos(); }, []);

  const estaInscrito = (id_curso: number) =>
    inscripciones.some(i => i.id_curso === id_curso && i.estado === 'ACTIVA');

  const getCodigoInscripcion = (id_curso: number) =>
    inscripciones.find(i => i.id_curso === id_curso && i.estado === 'ACTIVA')?.codigo;

  const handleInscribirse = async (id_curso: number) => {
    try {
      const res = await fetch(`${API_URL}/api/inscripciones`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: usuario.id_usuario, id_curso }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error); return; }
      alert("¡Inscripción realizada correctamente!");
      cargarDatos();
    } catch { alert("Error al inscribirse"); }
  };

  const handleBaja = async (id_curso: number) => {
    const codigo = getCodigoInscripcion(id_curso);
    if (!codigo) return;
    if (!confirm("¿Seguro que quieres darte de baja?")) return;
    try {
      await fetch(`${API_URL}/api/inscripciones/${codigo}`, { method: "PUT" });
      alert("Baja realizada correctamente");
      cargarDatos();
    } catch { alert("Error al darse de baja"); }
  };

  const cursosFiltrados = cursos.filter(c =>
    filtro === "Todos" || c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="inscripciones-section">
      <div className="inscripciones-inner">

        <h2 className="inscripciones-titulo">📝 Gestionar inscripciones</h2>

        {/* Columna izquierda */}
        <div>
          {/* Filtros */}
          <div className="inscripciones-filtros">
            {FILTROS.map(f => (
              <button
                key={f}
                className={`inscripciones-filtro-btn ${f === "Todos" ? "todos" : f === "Infantil" ? "infantil" : f === "Adultos" ? "adultos" : "tecnico"}`}
                onClick={() => setFiltro(f)}
                style={{ opacity: filtro === f ? 1 : 0.6 }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Lista */}
          <div className="inscripciones-lista">
            {loading ? (
              <p style={{ color: "#6b7280", fontSize: 14 }}>Cargando...</p>
            ) : cursosFiltrados.length === 0 ? (
              <p style={{ color: "#6b7280", fontSize: 14 }}>No hay clases disponibles.</p>
            ) : (
              cursosFiltrados.map(c => {
                const inscrito = estaInscrito(c.id_curso);
                return (
                  <div className="inscripcion-card" key={c.id_curso}>
                    <div className="inscripcion-card-info">
                      <p className="inscripcion-card-nombre">{c.nombre}</p>
                      <p className="inscripcion-card-horario">{c.descripcion}</p>
                      <div className="inscripcion-card-plazas">
                        👤 {c.inscritos} inscritos
                        <span className={`inscripcion-badge ${inscrito ? "inscrito" : "abiertas"}`}>
                          {inscrito ? "Inscrito" : "Plazas abiertas"}
                        </span>
                      </div>
                    </div>

                    {inscrito ? (
                      <button
                        className="inscripcion-btn-baja"
                        onClick={() => handleBaja(c.id_curso)}
                      >
                        Darse de Baja
                      </button>
                    ) : (
                      <button
                        className="inscripcion-btn-inscribir"
                        onClick={() => handleInscribirse(c.id_curso)}
                      >
                        Inscribirse
                      </button>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Columna derecha — Recomendaciones */}
        <div className="inscripciones-recomendaciones">
          <p className="inscripciones-rec-titulo">💡 Recomendaciones para tus clases</p>
          <ul className="inscripciones-rec-lista">
            <li>Llevar uniforme completo.</li>
            <li>Llegar 10 minutos antes.</li>
            <li>No molestar a los demás.</li>
            <li>Traer botella de agua.</li>
            <li>Traer material personal.</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default GestionarInscripciones;