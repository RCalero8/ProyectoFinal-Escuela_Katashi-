import React, { useEffect, useState, useCallback } from "react";
import type { Testimonio } from "../../../tipos/testimonios";
import "../../../style/Invitado/Conocenos/Testimonios.css";

const API_URL = "https://proyectofinal-escuelakatashi-production.up.railway.app";

const Testimonios: React.FC = () => {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [actual, setActual]           = useState(0);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/testimonios`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Testimonio[]) => {
        setTestimonios(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const anterior = useCallback(() => {
    setActual((prev) => (prev === 0 ? testimonios.length - 1 : prev - 1));
  }, [testimonios.length]);

  const siguiente = useCallback(() => {
    setActual((prev) => (prev === testimonios.length - 1 ? 0 : prev + 1));
  }, [testimonios.length]);

  if (loading)
    return (
      <div className="testimonios-section" style={{ textAlign: "center", color: "#6b7280" }}>
        Cargando testimonios...
      </div>
    );

  if (error || testimonios.length === 0)
    return null;

  return (
    <section className="testimonios-section">
      <div className="testimonios-inner">

        {/* Cabecera */}
        <h2 className="testimonios-titulo">Lo Que Dicen Nuestros Alumnos</h2>
        <p className="testimonios-subtitulo">Testimonios reales de nuestra comunidad</p>

        {/* Slider */}
        <div className="testimonios-slider-wrap">
          {testimonios.map((t, i) => (
            <div
              key={t.id_testimonio}
              className={`testimonios-slide ${i === actual ? "activo" : ""}`}
            >
              <div className="testimonio-card">

                {/* Avatar + nombre */}
                <div className="testimonio-autor">
                  <div className="testimonio-avatar">
                    {t.nombre.charAt(0)}{t.apellido.charAt(0)}
                  </div>
                  <div className="testimonio-autor-info">
                    <p className="testimonio-nombre">{t.nombre} {t.apellido}</p>
                    <p className="testimonio-rol">{t.rol}</p>
                  </div>
                </div>

                {/* Estrellas */}
                <div className="testimonio-estrellas">
                  {"★".repeat(t.estrellas)}{"☆".repeat(5 - t.estrellas)}
                </div>

                {/* Texto */}
                <p className="testimonio-texto">"{t.texto}"</p>

              </div>
            </div>
          ))}
        </div>

        {/* Navegación */}
        <div className="testimonios-nav">
          <button className="testimonios-btn-nav" onClick={anterior}>←</button>
          <button className="testimonios-btn-nav" onClick={siguiente}>→</button>

          <div className="testimonios-dots">
            {testimonios.map((_, i) => (
              <button
                key={i}
                className={`testimonios-dot ${i === actual ? "activo" : ""}`}
                onClick={() => setActual(i)}
              />
            ))}
          </div>

          <span className="testimonios-contador">
            {testimonios.length} testimonios de nuestra comunidad
          </span>
        </div>

      </div>
    </section>
  );
};

export default Testimonios;