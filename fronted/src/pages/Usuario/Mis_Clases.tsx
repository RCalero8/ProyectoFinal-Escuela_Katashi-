import Header from "../../components/Header/usuario/Header";
import MisClases from "../../components/Usuario/Mis_Clases/mis_clases";
import ProxClase from "../../components/Usuario/Mis_Clases/proximasclases";
import Historia from "../../components/Usuario/Mis_Clases/Historialasistencia";
import Gestionar from "../../components/Usuario/Mis_Clases/Gestionar_inscripciones";
import {Footer} from "../../components/Footer/Usuario/Footer";

const Mis_clases = () => {
  return (
    <>
      <Header />
      <MisClases />
      <ProxClase/>
      <Historia />
      <Gestionar />
      <Footer />
    </>
  );
};

export default Mis_clases;
