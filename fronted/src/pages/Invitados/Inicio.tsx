import { Link } from 'react-router-dom';
import '../../style/Invitado/Inicio.css'
const Inicio = () => {
    return (
        <>
            <section className="hero">
                <div className="hero-overlay">
                    <h1>Bienvenido a la Escuela de Karate Katashi</h1>
                    <p>Descubre el camino del karate y empieza tu entrenamiento hoy</p>
                    <div className="hero-buttons">
                        <button className="conocenos">Conocenos</button>
                        <button className="ver_clases">Ver Clases</button>
                    </div>
                </div>
            </section>
            <section className="especial-nav">
                <div className="especial-left">
                    <img src="/Imagenes_Invitado/Inicio/Principal.jpeg" alt="Especial" className="especial-img" />
                    <div className="especial-text">
                        <h3>Escuela de Karate Katashi</h3>
                        <h4>Tradición y Disciplina</h4>
                    </div>
                </div>
                <div className="especial-right">
                    <button id="conocenos">Conocenos</button>
                </div>
            </section>
            <section className="beneficios">
                <div className="beneficios_intro">
                    <h2>Qué ofrecemos</h2>
                    <p>Más que un deporte, una filosofía de vida</p>
                </div>

                <div className="beneficios_grid">
                    <div className="beneficio" id="karate">
                        <img src="/Imagenes_Invitado/Inicio/QUE OFRECEMOS/tROFEO.png" alt="" />
                        <h3>Karate tradicional</h3>
                        <p>Disciplina, técnica y valores del auténtico karate-do.</p>
                    </div>
                    <div className="beneficio" id="Participación">
                        <img src="/Imagenes_Invitado/Inicio/QUE OFRECEMOS/descarga.png" alt="" />
                        <h3>Participación en Competiciones</h3>
                        <p>Compite a nivel local y provincial con nuestro equipo.</p>
                    </div>
                    <div className="beneficio" id="Desarrollo">
                        <img src="/Imagenes_Invitado/Inicio/QUE OFRECEMOS/corazon.png" alt="" />
                        <h3>Desarrollo Físico y Mental</h3>
                        <p>Mejora tu condición física y fortalece tu mente.</p>
                    </div>
                    <div className="beneficio" id="Senseis">
                        <img src="/Imagenes_Invitado/Inicio/QUE OFRECEMOS/Usuario.png" alt="" />
                        <h3>Senseis Certificados</h3>
                        <p>Instructores con años de experiencia y certificación oficial.</p>
                    </div>
                </div>
            </section>
            <section className="porque">
                <div className="porque_intro">
                    <h2>¿Por qué elegirnos?</h2>
                    <p>En nuestra escuela, cada alumno es único. Nos enfocamos en el desarrollo integral de la persona, combinando la
                        tradición del karate con métodos de enseñanza modernos y efectivos. Únete a nuestra familia y descubre tu
                        potencial.</p>
                </div>

                <div className="porque_grid">
                    <div className="razon">
                        <h3>200+</h3>
                        <p>Alumnos</p>
                    </div>
                    <div className="razon">
                        <h3>15+</h3>
                        <p>Años de experiencia</p>
                    </div>
                    <div className="razon">
                        <h3>50+</h3>
                        <p>Trofeos</p>
                    </div>
                </div>
            </section>
            <section className="seccion_final">
                <div className="seccion_contenido">
                    <h2>¿Quieres iniciarte en el camino del Karate?</h2>

                    <p className="descripcion">
                        Únete a nuestra comunidad y comienza tu transformación física y mental hoy mismo.
                    </p>

                    <div className="botones">
                        <button className="btn registro">🙎 Registrarse</button>
                        <button className="btn inicio">⛩️ Iniciar Sesión</button>
                    </div>

                    <div className="iconos_info">
                        <div className="icono">
                            <h4>🥋</h4>
                            <p>Tradicion</p>
                        </div>
                        <div className="icono">
                            <h4>💪</h4>
                            <p>Fuerza</p>
                        </div>
                        <div className="icono">
                            <h4>🧘</h4>
                            <p>Disciplina</p>
                        </div>
                        <div className="icono">
                            <h4>🏆</h4>
                            <p>Trofeo</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="historia_container" id="contenido">

                <article className="historia_principal">
                    <h2>Nuestra historia</h2>

                    <p>
                        La Escuela de Karate Katashi nació con el objetivo de transmitir los valores
                        del karate tradicional: disciplina, respeto y superación.
                    </p>

                    <p>
                        Nuestro dojo es un espacio donde niños y adultos desarrollan no solo sus habilidades físicas,
                        sino también su carácter y autoconfianza. Bajo la guía de senseis certificados y con años
                        de experiencia, cada alumno encuentra su propio camino en el karate.
                    </p>

                    <Link to="/conocenos" className="btn historia">
                        Leer más
                    </Link>
                </article>

                <aside className="historia_noticias">
                    <h3>Últimas noticias</h3>

                    <ul className="lista_noticias">
                        <li>
                            <span className="fecha">12 Mar 2026</span>
                            <p>Resultados del torneo provincial de kata</p>
                        </li>

                        <li>
                            <span className="fecha">05 Mar 2026</span>
                            <p>Nuevos horarios infantiles</p>
                        </li>

                        <li>
                            <span className="fecha">01 Mar 2026</span>
                            <p>Entrenamiento especial sábado</p>
                        </li>
                    </ul>
                    <button className="ver-todas">
                    <Link to="/noticias" className="ver-todas">
                        Ver todas
                    </Link>
                    </button>
                </aside>

            </section>
        </>
    );
}
export default Inicio;
