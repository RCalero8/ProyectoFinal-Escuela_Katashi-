import MisClases from "../../components/Usuario/Mis_Clases/mis_clases";
import ProxClase from "../../components/Usuario/Mis_Clases/proximasclases";
import Historia from "../../components/Usuario/Mis_Clases/Historialasistencia";
import Gestionar from "../../components/Usuario/Mis_Clases/Gestionar_inscripciones";

const Mis_clases = () => {
  return (
    <>
      <MisClases />
      <ProxClase/>
      <Historia />
      <Gestionar />
    </>
  );
};

export default Mis_clases;
