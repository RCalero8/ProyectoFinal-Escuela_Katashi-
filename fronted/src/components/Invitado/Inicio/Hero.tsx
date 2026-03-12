import "../../../style/Invitado/Inicio/Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-titulo">Bienvenido a la Escuela Karate Katashi</h1>
        <p className="hero-descripcion">
          Descubre el camino del karate y empieza tu entrenamiento hoy.
        </p>
        <div className="hero-btns">
          <button
            className="btn-conocenos"
            onClick={() => {
              document
                .getElementById("historia")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Conocenos
          </button>
          <button className="btn-verclases">Ver Clase</button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
