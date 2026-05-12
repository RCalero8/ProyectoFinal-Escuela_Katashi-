import Hero from "../../components/Usuario/Inicio/Hero";
import Dashboard from "../../components/Usuario/Inicio/UserDashboard";
import Horario from "../../components/Usuario/Inicio/Iniciousuariosecciones";
import {Footer} from "../../components/Footer/Usuario/Footer";

const Inicio = () => {
  return (
    <>
      <Hero />
      <Dashboard />
      <Horario />
      <Footer />
    </>
  );
};

export default Inicio;
