import Header from "../../components/Header/usuario/Header";
import Hero from "../../components/Usuario/Inicio/Hero";
import Dashboard from "../../components/Usuario/Inicio/UserDashboard";
import News from "../../components/Usuario/Inicio/LatestNews";

const Inicio = () => {
  return (
    <>
      <Header />
      <Hero />
      <Dashboard />
      <News />
    </>
  );
};

export default Inicio;
