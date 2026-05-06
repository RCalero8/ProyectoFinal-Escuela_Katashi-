import "../../../style/Usuario/Inicio/Hero.css";

const Hero = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
    const nombre  = usuario?.nombre || "Usuario";
  
  return (
    <div className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-titulo">👋 ¡Bienvenido, <span>{nombre}</span> !</h1>
        <p className="hero-descripcion">
          Este es tu panel personal. Aquí puedes consultar tus clases, pagos y noticias del dojo
        </p>
      </div>
    </div>
  );
};

export default Hero;
