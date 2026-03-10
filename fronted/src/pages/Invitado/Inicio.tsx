import Beneficios from "../../components/Invitado/Inicio/Beneficios";
import CTA_Final from "../../components/Invitado/Inicio/CTA_Final";
import Especial_Nav from "../../components/Invitado/Inicio/Especial_Nav";
import Hero from "../../components/Invitado/Inicio/Hero";
import Historia from "../../components/Invitado/Inicio/Historia";

const Inicio = () => {
    return (
        <>
        <Hero />
       <Especial_Nav/>
       <Beneficios/>
       <CTA_Final/>
       <Historia />
       </>
    )
}

export default Inicio;
