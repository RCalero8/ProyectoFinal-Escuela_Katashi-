import React, { useState } from "react";
import "../../../style/Invitado/Conocenos/Nuestrahistoria.css";

const estadistica = [
  { valor: "15+", label: "Años" },
  { valor: "200+", label: "Alumnos" },
  { valor: "50+", label: "Torneos" },
];

const NuestraHistoria: React.FC = () => {
  const [expandido, setExpandido] = useState(false);

  return (
    <section className="historia-section">
      <div className="historia-inner">
        {/*Columna izquierda*/}
        <div className="hitoria-texto">
          <h2 className="historia-titulo">Nuestra Historia</h2>
          <p>
            La Escuela de Karate Katasho nació con el objetivo de transmitir los
            valores del karate tradicional: disciplina, respeto y superación.
            Desde nuestros inicios, hemos formado a decenas de alumnos de todas
            las edades, creando una comunidad unida por la pasión por las artes
            marciales.
          </p>
          <p>
            Nuestro dojo es un espacio donde niños y adultos desarrollan no solo
            sus habilidades físicas, sino también su carácter y autoconfianza.
            Bajo la guía de senseis certificados y con años de experiencia, cada
            alumno encuentra su propio camino en el karate.{" "}
          </p>
          <p>
            Nos enorgullece ser parte de la comunidad de Camas, ofreciendo un
            entorno seguro y motivador donde el aprendizaje y el crecimiento
            personal son nuestra prioridad.
          </p>
          {/*Textos adicionales*/}
          <div
            className={`historia-extra ${expandido ? "historia-extra--visible" : ""}`}
          >
            <div className="historia-extra-inner">
              <p>
                Nuestro fundador, con más de 25 años de experiencia en las artes
                marciales, decidió abrir las puertas del dojo con una misión
                clara: hacer del karate una herramienta de transformación
                personal. Lo que empezó como un pequeño grupo de entusiastas, se
                convirtió con los años en una escuela de referencia en Camas y
                sus alrededores.
              </p>
              <p>
                A lo largo de nuestra trayectoria hemos participado en más de 50
                torneos regionales y nacionales, cosechando medallas y, sobre
                todo, formando personas íntegras. Cada competición es una
                oportunidad de aprendizaje, no solo un escenario para ganar.
              </p>
              <p>
                Hoy seguimos creciendo, incorporando nuevas disciplinas y
                metodologías que complementan la enseñanza tradicional del
                karate. Porque en Katasho creemos que el arte marcial no tiene
                fin: siempre hay un nuevo cinturón que alcanzar, dentro y fuera
                del tatami.
              </p>
            </div>
          </div>
          {/*boton para expandir*/}
          <button
            className="historia-btn"
            onClick={() => setExpandido(!expandido)}
          >
            {expandido ? "Leer menos" : "Leer historia completa"}
            <span
              className={`historia-btn-arrow ${expandido ? "historia-btn-arrow--up" : ""}`}
            >
              ▶
            </span>
          </button>
        </div>
        {/*Columna derecha*/}
        <div className="historia-imagen-wrap">
            <img src="/Imagenes_Invitado/Conocenos/NuestraHistoria.jpeg" alt="Nuestra Historia" className="historia-img"/>
            <div className="historia-stats">
                {estadistica.map((s) => (
                    <div key={s.label} className="historia-stat">
                        <span className="historia-stat-valor">{s.valor}</span>
                        <span className="historia-stat-label">{s.label}</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </section>
  );
};
export default NuestraHistoria;