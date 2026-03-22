import React, { useEffect, useState } from "react";
import type { Sensei } from "../../../tipos/senseis";
import "../../../style/Invitado/Conocenos/Senseis.css";
 
const API_URL = "https://proyectofinal-escuelakatashi-production.up.railway.app";
 
// Imagen placeholder por sensei (cámbiala cuando tengas las reales)
const imagenes: Record<number, string> = {
  1: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400&q=80",
  2: "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=400&q=80",
  3: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80",
  4: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=400&q=80",
};
 
const Senseis: React.FC = () => {
  const [senseis, setSenseis] = useState<Sensei[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);
 
  useEffect(() => {
    fetch(`${API_URL}/api/senseis`)
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
 
                <button className="sensei-btn">Ver perfil completo</button>
              </div>
            </div>
          ))}
        </div>
 
      </div>
    </section>
  );
};
 
export default Senseis;
 