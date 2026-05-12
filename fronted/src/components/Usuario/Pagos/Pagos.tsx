import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import "./Pagos.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Pago {
  id_pago: number;
  concepto: string;
  importe: number;
  fecha: string;
  estado: string;
  metodo_pago: string;
}

const Pagos: React.FC = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");

  const [metodoPago, setMetodoPago] = useState<string>("Metálico");
  const [pagos, setPagos]           = useState<Pago[]>([]);
  const [loading, setLoading]       = useState(true);
  const [form, setForm]             = useState({
    nombre: usuario.nombre || "",
    apellido: usuario.apellido || "",
    email: usuario.email || "",
    dni: "",
    direccion: "",
    ciudad: "Sevilla",
    codigo_postal: "41900",
    pais: "España",
    nota: "",
  });

  const cargarPagos = () => {
    fetch(`${API_URL}/api/pagos/${usuario.id_usuario}`)
      .then(r => r.json())
      .then(data => {
        setMetodoPago(data.metodo_pago || "Metálico");
        setPagos(Array.isArray(data.pagos) ? data.pagos : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { cargarPagos(); }, []);

  const pagosPendientes = pagos.filter(p => p.estado === 'PENDIENTE');
  const pagosPagados    = pagos.filter(p => p.estado === 'COMPLETADO');
  const ultimoPago      = pagosPagados[0];
  const proximoPago     = pagosPendientes[0];

  // Próximo pago siempre el día 15 del mes siguiente
  const getProximaFecha = () => {
    const hoy = new Date();
    const proximoMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 15);
    return `15/${String(proximoMes.getMonth() + 1).padStart(2, "0")}/${String(proximoMes.getFullYear()).slice(2)}`;
  };

  const formatFecha = (f: string) => {
    if (!f) return "—";
    const d = new Date(f);
    return `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${String(d.getFullYear()).slice(2)}`;
  };

  const handlePagar = async (id_pago: number) => {
    if (!confirm("¿Confirmas el pago?")) return;
    await fetch(`${API_URL}/api/pagos/pagar/${id_pago}`, { method: "POST" });
    alert("✅ Pago realizado correctamente");
    cargarPagos();
  };

  const handleGuardar = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/pagos/facturacion/${usuario.id_usuario}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("✅ Datos actualizados correctamente");
  };

  const descargarPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(204, 0, 0);
    doc.rect(0, 0, 210, 28, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Escuela de Karate Katashi — Historial de Pagos", 14, 18);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(`Alumno: ${usuario.nombre} ${usuario.apellido}`, 14, 40);
    doc.text(`Fecha: ${new Date().toLocaleDateString("es-ES")}`, 14, 48);

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("Fecha", 14, 62);
    doc.text("Concepto", 45, 62);
    doc.text("Importe", 130, 62);
    doc.text("Estado", 155, 62);
    doc.text("Método", 178, 62);
    doc.line(14, 65, 196, 65);

    let y = 73;
    doc.setFont("helvetica", "normal");
    pagos.forEach(p => {
      if (y > 270) { doc.addPage(); y = 20; }
      doc.text(formatFecha(p.fecha), 14, y);
      doc.text(p.concepto.slice(0, 35), 45, y);
      doc.text(`${p.importe}€`, 130, y);
      if (p.estado === "COMPLETADO") { doc.setTextColor(22, 163, 74); }
      else { doc.setTextColor(202, 138, 4); }
      doc.text(p.estado, 155, y);
      doc.setTextColor(0, 0, 0);
      doc.text(p.metodo_pago || metodoPago, 178, y);
      y += 10;
    });

    doc.save(`pagos_${usuario.nombre}_${usuario.apellido}.pdf`);
  };

  const esTarjeta = metodoPago === "Tarjeta";

  if (loading) return <div className="pagos-section" style={{padding:48, textAlign:"center", color:"#6b7280"}}>Cargando...</div>;

  return (
    <div className="pagos-section">

      {/* Banner método */}
      <div className={`pagos-banner ${esTarjeta ? "tarjeta" : "metalico"}`}>
        <span className="pagos-banner-emoji">{esTarjeta ? "💳" : "💵"}</span>
        <div className="pagos-banner-texto">
          <strong>Método Elegido : {esTarjeta ? "Tarjeta" : "Físico"}</strong>
          <span>{esTarjeta
            ? "Tus cuotas se cobran automáticamente con la tarjeta principal guardada"
            : "Consulta tus cuotas y realiza tus pagos en el dojo"
          }</span>
        </div>
      </div>

      <div className="pagos-inner">

        {/* Título */}
        <h2 className="pagos-titulo">💰 Pagos</h2>
        <p className="pagos-subtitulo">Gestiona tus cuotas y métodos de pago</p>

        {/* Stats */}
        <div className="pagos-stats">
          <div className="pagos-stat">
            <span className="pagos-stat-valor">30€</span>
            <span className="pagos-stat-label">Cuota activa</span>
          </div>
          <div className="pagos-stat">
            <span className="pagos-stat-valor">{getProximaFecha()}</span>
            <span className="pagos-stat-label">Próximo Pago</span>
          </div>
          <div className="pagos-stat">
            <span className="pagos-stat-valor">{ultimoPago ? formatFecha(ultimoPago.fecha) : "—"}</span>
            <span className="pagos-stat-label">Último Pago</span>
          </div>
        </div>

        {/* Pagos pendientes */}
        <div className="pagos-pendientes">
          <div className="pagos-pendientes-header">
            <h3 className="pagos-titulo" style={{fontSize:20, margin:0}}>Pagos Pendientes</h3>
            {pagosPendientes.length > 0 && (
              <span className="pagos-badge-pendiente">{pagosPendientes.length} cuota pendiente</span>
            )}
          </div>
          <p className="pagos-subtitulo">Revisa y confirma tus cobros del mes en curso</p>

          {pagosPendientes.length === 0 ? (
            <p style={{color:"#16a34a", fontSize:14}}>✅ No tienes pagos pendientes.</p>
          ) : (
            pagosPendientes.map(p => (
              <div className="pagos-pendiente-card" key={p.id_pago}>
                <p className="pagos-pendiente-nombre">{p.concepto} - {p.importe}€</p>
                <p className="pagos-pendiente-desc">
                  {esTarjeta
                    ? "Pago previsto con Visa ******21"
                    : "Este pago debe realizarse en persona en la secretaría del dojo (horario: L-V de 17:00 a 20:00)"}
                </p>
                <div className="pagos-pendiente-btns">
                  <button className="pagos-btn-pagar" onClick={() => handlePagar(p.id_pago)}>
                    Pagar ahora
                  </button>
                  <button className="pagos-btn-cambiar">Cambiar método de pago</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Historial */}
        <div className="pagos-historial">
          <h3 className="pagos-titulo" style={{fontSize:20}}>Historial de pagos:</h3>
          <p className="pagos-subtitulo">Consulta los cobros realizados y descarga historial</p>

          <div className="pagos-tabla-wrap">
            <table className="pagos-tabla">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Concepto</th>
                  <th>Importe</th>
                  <th>Estado</th>
                  <th>Método</th>
                </tr>
              </thead>
              <tbody>
                {pagosPagados.length === 0 ? (
                  <tr><td colSpan={5} style={{textAlign:"center", color:"#9ca3af", padding:20}}>Sin pagos registrados</td></tr>
                ) : (
                  pagosPagados.map(p => (
                    <tr key={p.id_pago}>
                      <td>{formatFecha(p.fecha)}</td>
                      <td>{p.concepto}</td>
                      <td>{p.importe}€</td>
                      <td><span className="pagos-estado-pagado">✅ Pagado</span></td>
                      <td>{p.metodo_pago || metodoPago}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <button className="pagos-btn-descargar" onClick={descargarPDF}>Descargar historial</button>
        </div>

        {/* Métodos de pago */}
        <div className="pagos-metodos">
          <h3 className="pagos-titulo" style={{fontSize:20}}>Métodos de pagos:</h3>

          {esTarjeta ? (
            <>
              <p className="pagos-subtitulo">Gestiona tus tarjetas guardadas y selecciona la principal para tus cobros automáticos</p>
              <div className="pagos-tarjeta-card">
                <div className="pagos-tarjeta-info">
                  <span className="pagos-tarjeta-emoji">💳</span>
                  <div>
                    <div className="pagos-tarjeta-num">Visa terminada en 21</div>
                    <div className="pagos-tarjeta-titular">Titular: {usuario.nombre} {usuario.apellido} · Caduca 08/27</div>
                  </div>
                </div>
                <div className="pagos-tarjeta-acciones">
                  <span className="pagos-badge-principal">Principal</span>
                </div>
              </div>
              <button className="pagos-btn-anadir">+ Añadir tarjeta</button>
            </>
          ) : (
            <>
              <p className="pagos-subtitulo">Información sobre cómo se gestionan tus pagos en metálico:</p>
              <div className="pagos-metalico-card">
                <p className="pagos-metalico-titulo">💵 Método de pago: Metálico</p>
                <ul className="pagos-metalico-lista">
                  <li>Realiza tus pagos directamente en la escuela</li>
                  <li>No hay cargos automáticos</li>
                  <li>No se almacenan métodos de pago</li>
                  <li>Si desea cambiar el método de pago, debe de hablar con el administrador</li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Ajuste de facturación */}
        <div className="pagos-facturacion">
          <h3 className="pagos-titulo" style={{fontSize:20}}>Ajuste de facturación</h3>
          <p className="pagos-subtitulo">
            {esTarjeta
              ? "Actualiza tus datos fiscales y dirección de facturación asociados a los cobros automáticos"
              : "Configura los datos que aparecerán en tus facturas. Esto no afecta a tu método de pago"}
          </p>

          <form onSubmit={handleGuardar}>
            <div className="pagos-form-grid">
              <div className="pagos-form-field">
                <label className="pagos-form-label">Nombre del titular</label>
                <input className="pagos-form-input" placeholder="Juan Perez García"
                  value={`${form.nombre} ${form.apellido}`}
                  onChange={e => setForm({...form, nombre: e.target.value.split(" ")[0], apellido: e.target.value.split(" ").slice(1).join(" ")})} />
              </div>
              <div className="pagos-form-field">
                <label className="pagos-form-label">DNI / NIE</label>
                <input className="pagos-form-input" placeholder="12345678A"
                  value={form.dni} onChange={e => setForm({...form, dni: e.target.value})} />
              </div>
              <div className="pagos-form-field">
                <label className="pagos-form-label">Correo Electrónico</label>
                <input className="pagos-form-input" type="email" placeholder="juan@example.com"
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="pagos-form-field">
                <label className="pagos-form-label">Dirección</label>
                <input className="pagos-form-input" placeholder="C. Principal 123"
                  value={form.direccion} onChange={e => setForm({...form, direccion: e.target.value})} />
              </div>
              <div className="pagos-form-field">
                <label className="pagos-form-label">Ciudad</label>
                <input className="pagos-form-input" placeholder="Sevilla"
                  value={form.ciudad} onChange={e => setForm({...form, ciudad: e.target.value})} />
              </div>
              <div className="pagos-form-field">
                <label className="pagos-form-label">Nota</label>
                <input className="pagos-form-input" placeholder="Usamos estos datos únicamente para la emisión de facturas"
                  value={form.nota} onChange={e => setForm({...form, nota: e.target.value})} />
              </div>
            </div>

            <p className="pagos-form-nota">
              {esTarjeta
                ? "Usaremos esta información en cada recibo generado por tus pagos con tarjeta"
                : "Modifique estos datos no cambie su modalidad de pago (metálico)"}
            </p>

            <button type="submit" className="pagos-btn-guardar">Guardar Cambios</button>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Pagos;