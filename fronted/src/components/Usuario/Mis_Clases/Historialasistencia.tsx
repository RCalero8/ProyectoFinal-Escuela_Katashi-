import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../../../style/Usuario/MIs_Clases/Historialasistencia.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Asistencia {
  id_asistencia: number;
  fecha: string;
  presente: boolean;
  dia: string;
  hora: string;
  tipo_clase: string;
  dojo: string;
}

const HistorialAsistencia: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [asistencias, setAsistencias] = useState<Asistencia[]>([]);
  const [loading, setLoading]         = useState(true);

  useEffect(() => {
    if (usuario?.id_usuario) {
      fetch(`${API_URL}/api/asistencia/${usuario.id_usuario}`)
        .then(r => r.json())
        .then(data => {
          setAsistencias(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, []);

  const formatFecha = (fecha: string) => {
    const d = new Date(fecha);
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  };

  const descargarPDF = () => {
    const doc = new jsPDF();

    // Cabecera
    doc.setFillColor(204, 0, 0);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Escuela de Karate Katashi", 14, 12);
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Historial de Asistencia", 14, 22);

    // Info alumno
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Alumno: ${usuario.nombre} ${usuario.apellido}`, 14, 42);
    doc.text(`Email: ${usuario.email}`, 14, 50);
    doc.text(`Fecha de emisión: ${new Date().toLocaleDateString("es-ES")}`, 14, 58);

    // Línea separadora
    doc.setDrawColor(204, 0, 0);
    doc.setLineWidth(0.5);
    doc.line(14, 64, 196, 64);

    // Cabecera tabla
    doc.setFillColor(245, 245, 245);
    doc.rect(14, 68, 182, 8, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("Fecha", 18, 74);
    doc.text("Clase", 70, 74);
    doc.text("Dojo", 120, 74);
    doc.text("Asistencia", 165, 74);

    // Filas
    let y = 82;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    asistencias.forEach((a, i) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }

      if (i % 2 === 0) {
        doc.setFillColor(252, 252, 252);
        doc.rect(14, y - 5, 182, 8, "F");
      }

      doc.setFontSize(10);
      doc.text(formatFecha(a.fecha), 18, y);
      doc.text(a.tipo_clase, 70, y);
      doc.text(a.dojo, 120, y);

      if (a.presente) {
        doc.setTextColor(22, 163, 74);
        doc.text("Presente", 165, y);
      } else {
        doc.setTextColor(220, 38, 38);
        doc.text("Ausente", 165, y);
      }

      doc.setTextColor(0, 0, 0);
      y += 10;
    });

    // Resumen
    const presentes = asistencias.filter(a => a.presente).length;
    const ausentes  = asistencias.length - presentes;

    y += 6;
    doc.setDrawColor(204, 0, 0);
    doc.line(14, y, 196, y);
    y += 10;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`Total clases: ${asistencias.length}`, 14, y);
    doc.setTextColor(22, 163, 74);
    doc.text(`Presentes: ${presentes}`, 80, y);
    doc.setTextColor(220, 38, 38);
    doc.text(`Ausentes: ${ausentes}`, 150, y);

    doc.save(`historial_${usuario.nombre}_${usuario.apellido}.pdf`);
  };

  return (
    <div className="historial-section">
      <div className="historial-inner">
        <h2 className="historial-titulo">🗂️ Historial de asistencia</h2>

        <div className="historial-tabla-wrap">
          <table className="historial-tabla">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Clase</th>
                <th>Asistencia</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="historial-vacio">Cargando...</td></tr>
              ) : asistencias.length === 0 ? (
                <tr><td colSpan={3} className="historial-vacio">No hay registros de asistencia aún.</td></tr>
              ) : (
                asistencias.map((a) => (
                  <tr key={a.id_asistencia}>
                    <td>{formatFecha(a.fecha)}</td>
                    <td>{a.tipo_clase}</td>
                    <td>
                      {a.presente
                        ? <span className="historial-presente">✓</span>
                        : <span className="historial-ausente">✗</span>
                      }
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button className="historial-btn-descargar" onClick={descargarPDF}>
          Descargar historial
        </button>

      </div>
    </div>
  );
};

export default HistorialAsistencia;
