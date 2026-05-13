import React from "react";
import jsPDF from "jspdf";
import "../../../style/Usuario/Federacion/Documentacion.css";

interface Documento {
  emoji: string;
  nombre: string;
  fecha: string;
  contenido: string;
  urlReal?: string; // Nueva propiedad opcional para archivos reales
}

const documentos: Documento[] = [
  { emoji: "📄", nombre: "Certificado de afiliación",    fecha: "01/01/2025", contenido: "Certificado que acredita la afiliación del alumno a la Escuela Katashi y la Federación." },
  { 
    emoji: "📋", 
    nombre: "Autorizaciones y reglamentos", 
    fecha: "2025", 
    contenido: "", 
    urlReal: "/docs/reglamento_licencias.pdf" // Ruta al archivo real
  },
  { emoji: "🪪", nombre: "Licencia digital (PDF)",       fecha: "01/01/2025", contenido: "Licencia federativa digital del alumno generada por el sistema." },
  { emoji: "🛡️", nombre: "Seguro deportivo",             fecha: "01/01/2025", contenido: "Póliza del seguro deportivo federativo vigente." },
  { 
    emoji: "📜", 
    nombre: "Normativa de competición",     
    fecha: "2025", 
    contenido: "", 
    urlReal: "/docs/normativa_competicion.pdf" // Ruta al archivo real
  },
  { 
    emoji: "⚖️", 
    nombre: "Código ético federativo",      
    fecha: "2025", 
    contenido: "", 
    urlReal: "/docs/codigo_etico.pdf" // Ruta al archivo real
  },
];

const Documentacion: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const manejarDescarga = (doc: Documento) => {
    // Si el documento tiene una URL real, abrimos/descargamos ese archivo directamente
    if (doc.urlReal) {
      const link = document.createElement('a');
      link.href = doc.urlReal;
      link.download = doc.urlReal.split('/').pop() || 'documento.pdf';
      link.click();
      return;
    }

    // Si no tiene URL real, generamos el PDF dinámico con jsPDF (como ya hacías)
    const pdf = new jsPDF();
    pdf.setFillColor(204, 0, 0);
    pdf.rect(0, 0, 210, 28, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.text("Escuela de Karate Katashi", 14, 12);
    pdf.setFontSize(12);
    pdf.text(doc.nombre, 14, 22);

    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(11);
    pdf.text(`Alumno: ${usuario.nombre} ${usuario.apellido}`, 14, 42);
    pdf.text(`Fecha de emisión: ${doc.fecha}`, 14, 52);

    pdf.setDrawColor(204, 0, 0);
    pdf.line(14, 58, 196, 58);

    pdf.setFontSize(11);
    pdf.setFont("helvetica", "normal");
    const lines = pdf.splitTextToSize(doc.contenido, 180);
    pdf.text(lines, 14, 70);

    pdf.save(`${doc.nombre.replace(/ /g, "_")}.pdf`);
  };

  return (
    <div className="docfed-section">
      <div className="docfed-inner">
        <h2 className="docfed-titulo">📁 Documentación federativa</h2>
        <p className="docfed-subtitulo">Descarga tus certificados y documentos oficiales de Karate</p>

        <div className="docfed-grid">
          {documentos.map((d) => (
            <div className="docfed-card" key={d.nombre}>
              <div className="docfed-card-info">
                <span className="docfed-card-emoji">{d.emoji}</span>
                <div className="docfed-card-texto">
                  <span className="docfed-card-nombre">{d.nombre}</span>
                  <span className="docfed-card-fecha">
                    {d.urlReal ? "Documento Oficial" : `Emitido: ${d.fecha}`}
                  </span>
                </div>
              </div>
              <button className="docfed-btn" onClick={() => manejarDescarga(d)}>
                {d.urlReal ? "Descargar PDF Real" : "Descargar"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Documentacion;
