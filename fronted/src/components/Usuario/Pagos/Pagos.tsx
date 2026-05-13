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

  // --- ESTADOS ---
  const [metodoPago, setMetodoPago] = useState<string>("Metálico");
  const [pagos, setPagos]           = useState<Pago[]>([]);
  const [loading, setLoading]       = useState(true);
  
  // Estado para el formulario de facturación
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

  // NUEVOS ESTADOS PARA LA TARJETA
  const [showAddCard, setShowAddCard] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: "",
    titular: `${usuario.nombre} ${usuario.apellido}`,
    fecha: "",
    cvv: ""
  });

  // --- FUNCIONES ---
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

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulación de envío al backend
    console.log("Enviando tarjeta:", nuevaTarjeta);
    alert("✅ Tarjeta añadida correctamente a tu perfil");
    setShowAddCard(false);
    setNuevaTarjeta({ numero: "", titular: `${usuario.nombre} ${usuario.apellido}`, fecha: "", cvv: "" });
  };

  const handlePagar = async (id_pago: number) => {
    if (!confirm("¿Confirmas el pago?")) return;
    await fetch(`${API_URL}/api/pagos/pagar/${id_pago}`, { method: "POST" });
    alert("✅ Pago realizado correctamente");
    cargarPagos();
  };

  const pagosPendientes = pagos.filter(p => p.estado === 'PENDIENTE');
  const pagosPagados    = pagos.filter(p => p.estado === 'COMPLETADO');
  const ultimoPago      = pagosPagados[0];
  const esTarjeta       = metodoPago === "Tarjeta";

  // --- RENDER ---
  if (loading) return <div className="pagos-loading">Cargando...</div>;

  return (
    <div className="pagos-section">
      {/* Banner Principal */}
      <div className={`pagos-banner ${esTarjeta ? "tarjeta" : "metalico"}`}>
        <span className="pagos-banner-emoji">{esTarjeta ? "💳" : "💵"}</span>
        <div className="pagos-banner-texto">
          <strong>Método Elegido: {esTarjeta ? "Tarjeta" : "Físico"}</strong>
          <span>{esTarjeta 
            ? "Tus cuotas se cobran automáticamente con la tarjeta principal guardada." 
            : "Consulta tus cuotas y realiza tus pagos en el dojo."}
          </span>
        </div>
      </div>

      <div className="pagos-inner">
        <h2 className="pagos-titulo">💰 Pagos</h2>
        
        {/* Estadísticas */}
        <div className="pagos-stats">
          <div className="pagos-stat">
            <span className="pagos-stat-valor">30€</span>
            <span className="pagos-stat-label">Cuota activa</span>
          </div>
          <div className="pagos-stat">
            <span className="pagos-stat-valor">15/06/25</span>
            <span className="pagos-stat-label">Próximo Pago</span>
          </div>
          <div className="pagos-stat">
            <span className="pagos-stat-valor">{ultimoPago ? "Pagado" : "Pendiente"}</span>
            <span className="pagos-stat-label">Estado actual</span>
          </div>
        </div>

        {/* MÉTODOS DE PAGO */}
        <div className="pagos-metodos">
          <h3 className="pagos-titulo" style={{ fontSize: 20 }}>Métodos de pagos:</h3>

          {esTarjeta ? (
            <>
              <p className="pagos-subtitulo">Gestiona tus tarjetas guardadas</p>
              
              <div className="pagos-tarjeta-card">
                <div className="pagos-tarjeta-info">
                  <span className="pagos-tarjeta-emoji">💳</span>
                  <div>
                    <div className="pagos-tarjeta-num">Visa terminada en 21</div>
                    <div className="pagos-tarjeta-titular">Titular: {usuario.nombre} {usuario.apellido} · 08/27</div>
                  </div>
                </div>
                <span className="pagos-badge-principal">Principal</span>
              </div>

              {/* LÓGICA DEL FORMULARIO AÑADIR TARJETA */}
              {!showAddCard ? (
                <button className="pagos-btn-anadir" onClick={() => setShowAddCard(true)}>
                  + Añadir tarjeta
                </button>
              ) : (
                <div className="pagos-add-card-form" style={{
                  background: "#f9fafb", padding: "20px", borderRadius: "8px", 
                  border: "1px solid #e5e7eb", marginTop: "15px"
                }}>
                  <h4 style={{ marginBottom: "15px" }}>Nueva Tarjeta</h4>
                  <form onSubmit={handleAddCard}>
                    <div className="pagos-form-grid">
                      <div className="pagos-form-field">
                        <label className="pagos-form-label">Número de Tarjeta</label>
                        <input className="pagos-form-input" placeholder="0000 0000 0000 0000" 
                          value={nuevaTarjeta.numero} onChange={e => setNuevaTarjeta({...nuevaTarjeta, numero: e.target.value})} required />
                      </div>
                      <div className="pagos-form-field">
                        <label className="pagos-form-label">Fecha (MM/AA)</label>
                        <input className="pagos-form-input" placeholder="08/27" 
                          value={nuevaTarjeta.fecha} onChange={e => setNuevaTarjeta({...nuevaTarjeta, fecha: e.target.value})} required />
                      </div>
                      <div className="pagos-form-field">
                        <label className="pagos-form-label">CVV</label>
                        <input className="pagos-form-input" type="password" placeholder="***" maxLength={3}
                          value={nuevaTarjeta.cvv} onChange={e => setNuevaTarjeta({...nuevaTarjeta, cvv: e.target.value})} required />
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                      <button type="submit" className="pagos-btn-guardar" style={{ margin: 0, width: "auto" }}>Guardar</button>
                      <button type="button" className="pagos-btn-cambiar" onClick={() => setShowAddCard(false)} style={{ background: "#ef4444", color: "white" }}>Cancelar</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="pagos-metalico-card">
              <span style={{ fontSize: "24px" }}>💵</span>
              <p>Tu modalidad de pago es <strong>Metálico</strong>. Acude a recepción para abonar tu cuota.</p>
            </div>
          )}
        </div>

        {/* HISTORIAL Y FACTURACIÓN (Se mantiene el resto del código igual) */}
        {/* ... */}
      </div>
    </div>
  );
};

export default Pagos;
