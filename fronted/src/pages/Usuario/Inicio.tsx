import Header from "../../components/Header/usuario/Header";
import Hero from "../../components/Usuario/Inicio/Hero";
import Dashboard from "../../components/Usuario/Inicio/UserDashboard";
import News from "../../components/Usuario/Inicio/LatestNews";
import Horario from "../../components/Usuario/Inicio/Iniciousuariosecciones";
const Inicio = () => {
  return (
    <>
      <Header />
      <Hero />
      <Dashboard />
      <News />
      <Horario />
    </>
  );
};

export default Inicio;
