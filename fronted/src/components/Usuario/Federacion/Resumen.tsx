import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "../../../style/Usuario/Federacion/Resumen.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";
 
interface Federacion {
  n_licencia: string;
  categoria: string;
  f_alta: string;
  f_renovacion: string;
  resultados_competic: string | null;
  observaciones: string | null;
  id_alumno: number;
  alumno_nombre: string;
  alumno_apellido: string;
  dni: string;
  f_nacimiento: string;
  nivel: string;
}
 
const Resumen: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [fichas, setFichas]   = useState<Federacion[]>([]);
  const [activo, setActivo]   = useState(0);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    fetch(`${API_URL}/api/federacion/${usuario.id_usuario}`)
      .then(r => r.json())
      .then(data => { setFichas(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);
 
  const formatFecha = (f: string) => {
    if (!f) return "—";
    const d = new Date(f);
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" });
  };
 
  const getEstado = (f_renovacion: string) => {
    const hoy   = new Date();
    const renov = new Date(f_renovacion);
    const diff  = Math.ceil((renov.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
    if (diff < 0)   return { clase: "expirada", texto: "❌ Expirada" };
    if (diff <= 30) return { clase: "proxima",  texto: "⚠️ Próxima a renovar" };
    return             { clase: "activa",   texto: "✅ Activa" };
  };
 
  // Parsear resultados (formato: "Torneo - fecha - resultado\n...")
  const parseResultados = (texto: string | null) => {
    if (!texto) return [];
    return texto.split("\n").filter(Boolean).map(linea => {
      const partes = linea.split(" - ");
      return {
        nombre:    partes[0] || linea,
        fecha:     partes[1] || "",
        resultado: partes[2] || "",
      };
    });
  };
 
  const descargarFicha = (f: Federacion) => {
    const doc = new jsPDF();
    doc.setFillColor(204, 0, 0);
    doc.rect(0, 0, 210, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Ficha Federativa — Escuela Karate Katashi", 14, 18);
 
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    const campos = [
      ["Nombre completo", `${f.alumno_nombre} ${f.alumno_apellido}`],
      ["DNI", f.dni],
      ["Número de licencia", f.n_licencia],
      ["Categoría", f.categoria],
      ["Nivel", f.nivel],
      ["Fecha de expedición", formatFecha(f.f_alta)],
      ["Fecha de caducidad", formatFecha(f.f_renovacion)],
    ];
    let y = 42;
    campos.forEach(([label, valor]) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, 14, y);
      doc.setFont("helvetica", "normal");
      doc.text(valor, 80, y);
      y += 10;
    });
    doc.save(`ficha_${f.alumno_nombre}_${f.alumno_apellido}.pdf`);
  };
 
  if (loading)
    return <div className="fed-resumen" style={{textAlign:"center", color:"#6b7280"}}>Cargando...</div>;
 
  const ficha = fichas[activo];
 
  return (
    <div className="fed-resumen">
      <div className="fed-resumen-inner">
 
        <h2 className="fed-resumen-titulo">🏅 Federación</h2>
        <p className="fed-resumen-subtitulo">Consulta tu ficha federativa y estado de licencia</p>
 
        {/* Tabs si hay varios alumnos */}
        {fichas.length > 1 && (
          <div className="fed-tabs">
            {fichas.map((f, i) => (
              <button
                key={f.id_alumno}
                className={`fed-tab ${i === activo ? "activo" : ""}`}
                onClick={() => setActivo(i)}
              >
                {f.alumno_nombre} {f.alumno_apellido}
              </button>
            ))}
          </div>
        )}
 
        {fichas.length === 0 ? (
          <div className="fed-vacio">No tienes fichas federativas registradas.</div>
        ) : ficha && (
          <div className="fed-grid">
 
            {/* ── Ficha Federativa ── */}
            <div className="fed-card">
              <p className="fed-card-titulo">📋 Ficha Federativa</p>
 
              <div className="fed-field">
                <span className="fed-field-label">Nombre completo</span>
                <span className="fed-field-valor">{ficha.alumno_nombre} {ficha.alumno_apellido}</span>
              </div>
              <div className="fed-field">
                <span className="fed-field-label">Número de licencia</span>
                <span className="fed-field-valor">{ficha.n_licencia}</span>
              </div>
              <div className="fed-field">
                <span className="fed-field-label">Fecha de expedición</span>
                <span className="fed-field-valor">{formatFecha(ficha.f_alta)}</span>
              </div>
              <div className="fed-field">
                <span className="fed-field-label">Fecha de caducidad</span>
                <span className="fed-field-valor">{formatFecha(ficha.f_renovacion)}</span>
              </div>
 
              <button className="fed-btn fed-btn-primary" onClick={() => descargarFicha(ficha)}>
                Ver ficha completa
              </button>
            </div>
 
            {/* ── Estado de licencia ── */}
            <div className="fed-card">
              <p className="fed-card-titulo">🥇 Estado de licencia</p>
 
              <div className="fed-field">
                <span className="fed-field-label">Tipo de licencia</span>
                <span className="fed-field-valor">{ficha.categoria}</span>
              </div>
              <div className="fed-field">
                <span className="fed-field-label">Vigencia</span>
                <span className="fed-field-valor">{formatFecha(ficha.f_alta)} – {formatFecha(ficha.f_renovacion)}</span>
              </div>
              <div className="fed-field">
                <span className="fed-field-label">Estado</span>
                <span className={`fed-estado-badge ${getEstado(ficha.f_renovacion).clase}`}>
                  {getEstado(ficha.f_renovacion).texto}
                </span>
              </div>
 
              <button className="fed-btn fed-btn-secondary">
                Renovar licencia
              </button>
            </div>
 
            {/* ── Historial de competencia ── */}
            <div className="fed-card">
              <p className="fed-card-titulo">🏆 Historial de competencia</p>
 
              {!ficha.resultados_competic ? (
                <p style={{fontSize:13, color:"#9ca3af"}}>Sin resultados registrados.</p>
              ) : (
                parseResultados(ficha.resultados_competic).map((r, i) => (
                  <div className="fed-competencia-item" key={i}>
                    <span className="fed-competencia-nombre">{r.nombre}</span>
                    {r.fecha && <span className="fed-competencia-fecha">{r.fecha}</span>}
                    {r.resultado && <span className="fed-competencia-resultado">🥇 {r.resultado}</span>}
                  </div>
                ))
              )}
 
              <button className="fed-btn fed-btn-secondary" style={{marginTop:"auto"}}>
                Ver historial completo
              </button>
            </div>
 
          </div>
        )}
 
      </div>
    </div>
  );
};
 
export default Resumen;
