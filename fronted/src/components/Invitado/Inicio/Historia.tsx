import '../../../style/Invitado/Inicio/Historia.css';
import { useState, useEffect } from "react";

// ─── Tipos ───────────────────────────────────────────────
interface Noticia {
  id:     number;
  titulo: string;
  fecha:  string;
  enlace: string;
}

// ─── Componente ──────────────────────────────────────────
export default function HistoriaNoticias() {

  // ─── Estado ────────────────────────────────────────────
  const [noticias,  setNoticias]  = useState<Noticia[]>([]);
  const [cargando,  setCargando]  = useState<boolean>(true);
  const [error,     setError]     = useState<string | null>(null);

  // ─── Petición al backend ────────────────────────────────
  useEffect(() => {
    fetch("http://localhost:3000/api/noticias?limite=3")
      .then((respuesta) => {
        // Si el servidor devuelve un error HTTP lo lanzamos
        if (!respuesta.ok) {
          throw new Error("Error al obtener las noticias");
        }
        return respuesta.json();
      })
      .then((datos: Noticia[]) => {
        setNoticias(datos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  // ─── Render ─────────────────────────────────────────────
  return (
    <div className="contenedor-pagina">

      {/* ── Sección Historia ── */}
      <section className="seccion-historia">

        <h2 className="titulo-historia">Nuestra Historia</h2>

        <p className="parrafo-historia">
          La Escuela de Karate Katasho nació con el objetivo de transmitir los valores del karate
          tradicional: disciplina, respeto y superación. Desde nuestros inicios, hemos formado a
          decenas de alumnos de todas las edades, creando una comunidad unida por la pasión
          por las artes marciales.
        </p>

        <p className="parrafo-historia">
          Nuestro dojo es un espacio donde niños y adultos desarrollan no solo sus habilidades
          físicas, sino también su carácter y autoconfianza. Bajo la guía de senseis certificados
          y con años de experiencia, cada alumno encuentra su propio camino en el karate.
        </p>

        <p className="parrafo-historia">
          Nos enorgullece ser parte de la comunidad de Camas, ofreciendo un entorno seguro
          y motivador donde el aprendizaje y el crecimiento personal son nuestra prioridad.
        </p>

        <button className="boton-leer-mas">
          Leer Mas ▶
        </button>

      </section>

      {/* ── Sección Noticias ── */}
      <section className="seccion-noticias">

        <h2 className="titulo-noticias">Últimas Noticias</h2>

        {/* Cargando */}
        {cargando && (
          <p className="estado-mensaje">Cargando noticias...</p>
        )}

        {/* Error */}
        {error && (
          <p className="estado-error">{error}</p>
        )}

        {/* Lista de noticias */}
        {!cargando && !error && (
          <ul className="lista-noticias">
            {noticias.map((n) => (
              <li className="elemento-noticia" key={n.id}>
                <span className="fecha-noticia">
                  {new Date(n.fecha).toLocaleDateString("es-ES", {
                    day:   "numeric",
                    month: "short",
                    year:  "numeric",
                  })}
                </span>
                <a className="titulo-noticia" href={n.enlace}>
                  {n.titulo}
                </a>
              </li>
            ))}
          </ul>
        )}

        <button className="boton-ver-noticias">
          Ver todas las noticias
        </button>

      </section>

    </div>
  );
}
