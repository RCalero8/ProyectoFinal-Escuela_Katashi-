import Header from "../../components/Header/usuario/Header";
import MisClases from "../../components/Usuario/Mis_Clases/mis_clases";
import ProxClase from "../../components/Usuario/Mis_Clases/proximasclases";
import Modal from "../../components/Usuario/Mis_Clases/Modalhorario";
import {Footer} from "../../components/Footer/Usuario/Footer";

const Mis_clases = () => {
  return (
    <>
      <Header />
      <MisClases />
      <ProxClase/>
      <Modal />
      <Footer />
    </>
  );
};

export default Mis_clases;
