import React, { useEffect, useState } from "react";
import type { Sensei } from "../../../tipos/senseis";
import "../../../style/Invitado/Conocenos/Senseis.css";
 
// Imagen placeholder por sensei (cámbiala cuando tengas las reales)
const imagenes: Record<number, string> = {
  1: "/Imagenes_Invitado/Conocenos/Senseis/Ana.jpg",
  2: "/Imagenes_Invitado/Conocenos/Senseis/Carlos.jpeg",
  3: "/Imagenes_Invitado/Conocenos/Senseis/Jose.jpg",
  4: "/Imagenes_Invitado/Conocenos/Senseis/Fran.jpg",
};
 
const Senseis: React.FC = () => {
  const [senseis, setSenseis] = useState<Sensei[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
  const [seleccionado, setSeleccionado] = useState<Sensei | null>(null);
 
  useEffect(() => {
    fetch(`https://proyectofinal-escuela-katashi.onrender.com/api/senseis`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Sensei[]) => {
        setSenseis(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);
 
  if (loading)
    return (
      <div className="senseis-section" style={{ textAlign: "center", color: "#6b7280" }}>
        Cargando equipo...
      </div>
    );
 
  if (error)
    return (
      <div className="senseis-section" style={{ textAlign: "center", color: "#ef4444" }}>
        No se pudo cargar el equipo. Inténtalo más tarde.
      </div>
    );
 
  return (
    <section className="senseis-section">
      <div className="senseis-inner">
 
        <div className="senseis-header">
          <h2 className="senseis-titulo">Nuestro Equipo de Instructores</h2>
          <p className="senseis-subtitulo">
            Profesionales dedicados con amplia experiencia y certificación oficial
          </p>
        </div>
 
        <div className="senseis-grid">
          {senseis.map((s) => (
            <div className="sensei-card" key={s.id_info}>
              <img
                src={imagenes[s.id_info] ?? "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80"}
                alt={`${s.nombre} ${s.apellido}`}
                className="sensei-img"
              />
              <div className="sensei-overlay">
                <span className="sensei-dan">{s.dan}</span>
                <p className="sensei-nombre">Sensei {s.nombre} {s.apellido}</p>
                <p className="sensei-rol">{s.rol_web}</p>
                <p className="sensei-bio">{s.biografia}</p>
                <button
                  className="sensei-btn"
                  onClick={() => setSeleccionado(s)}
                >
                  Ver perfil completo
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      {/* Modal */}
      {seleccionado && (
        <div className="sensei-modal-backdrop" onClick={() => setSeleccionado(null)}>
          <div className="sensei-modal" onClick={(e) => e.stopPropagation()}>
 
            {/* Botón cerrar */}
            <button className="sensei-modal-cerrar" onClick={() => setSeleccionado(null)}>
              ✕
            </button>
 
            {/* Imagen */}
            <div className="sensei-modal-img-wrap">
              <img
                src={imagenes[seleccionado.id_info] ?? "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80"}
                alt={`${seleccionado.nombre} ${seleccionado.apellido}`}
                className="sensei-modal-img"
              />
              <span className="sensei-modal-dan">{seleccionado.dan}</span>
            </div>
 
            {/* Info */}
            <div className="sensei-modal-info">
              <h3 className="sensei-modal-nombre">
                Sensei {seleccionado.nombre} {seleccionado.apellido}
              </h3>
              <p className="sensei-modal-rol">{seleccionado.rol_web}</p>
              <p className="sensei-modal-bio">{seleccionado.biografia}</p>
            </div>
 
          </div>
        </div>
      )}
    </section>
  );
};
 
export default Senseis;
 