import React from 'react';
import "../../../style/Invitado/Contacto/Faq.css";

const faqs = [
    {
        pregunta: "¿Cuándo puedo empezar las clases?",
        respuesta:
        "Puedes incorporarte en cualquier momento del año. Ofrecemos una clase de prueba gratuita para nuevos alumnos.",
    },
    {
        pregunta: "¿Qué necesito para la primera clase?",
        respuesta:
        "Para la clase de prueba solo necesitas ropa deportiva cómoda. El uniforme oficial (karategi) se puede adquirir posteriormente.",
    },
    {
        pregunta: "¿Hay clases para niños?",
        respuesta:
        "Sí, tenemos grupos adaptados por edades desde los 4 años. Los horarios se ajustan a cada categoría.",
    },
    {
        pregunta: "¿Cuáles son las formas de pago?",
        respuesta:
        "Aceptamos domiciliación bancaria mensual, transferencia y pago en efectivo. Consulta nuestras promociones vigentes.",
    },
];

const Faq: React.FC = () => {
    return (
        <section className="faq-section">
            <div className="faq-inner">
                <h2 className="faq-titulo">❓ Preguntas frecuentes</h2>
                <div className="faq-grid">
                    {faqs.map((f) => (
                        <div className="faq-card" key={f.pregunta}>
                            <p className="faq-pregunta">¿{f.pregunta.replace("¿", "")}</p>
                            <p className="faq-respuesta">{f.respuesta}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;