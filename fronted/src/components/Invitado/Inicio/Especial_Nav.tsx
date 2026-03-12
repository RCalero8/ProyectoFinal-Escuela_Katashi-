import "../../../style/Invitado/Inicio/Especial_Nav.css";

const Especial_Nav = () => {
  return (
    <section className="especial-nav">
      <div className="especial-left">
        <img
          src="Imagenes_Invitado/Inicio/Foto_Especial_Nav.png"
          alt="Evento especial"
          id="especial-img"
        />
        <div>
          <h2>Escuela de Karate Katashi</h2>
          <p>Tradición y Disciplina</p>
        </div>
      </div>

      <button id="btn-especial" onClick={() => {
        document.getElementById("historia")?.scrollIntoView({ behavior: "smooth" });
      }}>
        Conocenos
      </button>
    </section>
  );
};

export default Especial_Nav;