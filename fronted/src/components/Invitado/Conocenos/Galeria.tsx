import React, { useState, useEffect, useCallback } from "react";
import "../../../style/Invitado/Conocenos/Galeria.css";

const fotos = [
  "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=1200&q=80",
  "https://images.unsplash.com/photo-1607962837359-5e7e89f86776?w=1200&q=80",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
  "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?w=1200&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200&q=80",
  "https://images.unsplash.com/photo-1549476464-37392f717541?w=1200&q=80",
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=80",
];

const Galeria: React.FC = () => {
  const [actual, setActual] = useState(0);

  const anterior = useCallback(() => {
    setActual((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));
  }, []);

  const siguiente = useCallback(() => {
    setActual((prev) => (prev === fotos.length - 1 ? 0 : prev + 1));
  }, []);

  // Auto-avance cada 4 segundos
  useEffect(() => {
    const timer = setInterval(siguiente, 4000);
    return () => clearInterval(timer);
  }, [siguiente]);

  return (
    <section className="galeria-section">
      <div className="galeria-inner">

        {/* Cabecera */}
        <div className="galeria-header">
          <h2 className="galeria-titulo">
            <span className="galeria-titulo-emoji">📷</span>
            Galería del Dojo
          </h2>
          <p className="galeria-subtitulo">
            Momentos especiales capturados en nuestro dojo
          </p>
        </div>

        {/* Slider */}
        <div className="galeria-slider-wrap">

          {fotos.map((foto, i) => (
            <div
              key={i}
              className={`galeria-slide ${i === actual ? "activo" : ""}`}
            >
              <img src={foto} alt={`Foto dojo ${i + 1}`} />
            </div>
          ))}

          {/* Botones nav */}
          <button className="galeria-btn-nav galeria-btn-prev" onClick={anterior}>
            ←
          </button>
          <button className="galeria-btn-nav galeria-btn-next" onClick={siguiente}>
            →
          </button>

          {/* Dots */}
          <div className="galeria-dots">
            {fotos.map((_, i) => (
              <button
                key={i}
                className={`galeria-dot ${i === actual ? "activo" : ""}`}
                onClick={() => setActual(i)}
              />
            ))}
          </div>

        </div>

        {/* Miniaturas */}
        <div className="galeria-thumbs">
          {fotos.map((foto, i) => (
            <div
              key={i}
              className={`galeria-thumb ${i === actual ? "activo" : ""}`}
              onClick={() => setActual(i)}
            >
              <img src={foto} alt={`Miniatura ${i + 1}`} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Galeria;