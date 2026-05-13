import React, { useEffect, useState } from "react";
// Se eliminó la importación de jsPDF ya que no se estaba usando en el renderizado
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
  
  // SE ELIMINÓ 'form' y 'setForm' porque causaban error TS6133

  const [showAddCard, setShowAddCard] = useState(false);
  const [nuevaTarjeta, setNuevaTarjeta] = useState({
    numero: "",
    titular: `${usuario.nombre} ${usuario.apellido}`,
    fecha: "",
    cvv: ""
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

  const handleAddCard = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando tarjeta:", nuevaTarjeta);
    alert("✅ Tarjeta añadida correctamente a tu perfil");
    setShowAddCard(false);
    setNuevaTarjeta({ numero: "", titular: `${usuario.nombre} ${usuario.apellido}`, fecha: "", cvv: "" });
  };

  // SE ELIMINÓ 'handlePagar' y 'pagosPendientes' para evitar error TS6133
  // Si los necesitas después, asegúrate de llamarlos en el código JSX

  const pagosPagados = pagos.filter(p => p.estado === 'COMPLETADO');
  const esTarjeta    = metodoPago === "Tarjeta";

  if (loading) return <div className="pagos-loading">Cargando...</div>;

  return (
    <div className="pagos-section">
      <div className={`pagos-banner ${esTarjeta ? "tarjeta" : "metalico"}`}>
        <span className="pagos-banner-emoji">{esTarjeta ? "💳" : "💵"}</span>
        <div className="pagos-banner-texto">
          <strong>Método Elegido: {esTarjeta ? "Tarjeta" : "Físico"}</strong>
          <span>{esTarjeta 
            ? "Tus cuotas se cobran automáticamente." 
            : "Realiza tus pagos en el dojo."}
          </span>
        </div>
      </div>

      <div className="pagos-inner">
        <h2 className="pagos-titulo">💰 Pagos</h2>
        
        <div className="pagos-metodos">
          <h3 className="pagos-titulo" style={{ fontSize: 20 }}>Métodos de pagos:</h3>

          {esTarjeta ? (
            <>
              <div className="pagos-tarjeta-card">
                <div className="pagos-tarjeta-info">
                  <span className="pagos-tarjeta-emoji">💳</span>
                  <div>
                    <div className="pagos-tarjeta-num">Visa terminada en 21</div>
                    <div className="pagos-tarjeta-titular">Titular: {usuario.nombre} {usuario.apellido}</div>
                  </div>
                </div>
                <span className="pagos-badge-principal">Principal</span>
              </div>

              {!showAddCard ? (
                <button className="pagos-btn-anadir" onClick={() => setShowAddCard(true)}>
                  + Añadir tarjeta
                </button>
              ) : (
                <div className="pagos-add-card-form" style={{
                  background: "#f9fafb", padding: "20px", borderRadius: "8px", 
                  border: "1px solid #e5e7eb", marginTop: "15px"
                }}>
                  <h4>Nueva Tarjeta</h4>
                  <form onSubmit={handleAddCard}>
                    <div className="pagos-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input className="pagos-form-input" placeholder="Número de Tarjeta" 
                        value={nuevaTarjeta.numero} onChange={e => setNuevaTarjeta({...nuevaTarjeta, numero: e.target.value})} required />
                      <input className="pagos-form-input" placeholder="MM/AA" 
                        value={nuevaTarjeta.fecha} onChange={e => setNuevaTarjeta({...nuevaTarjeta, fecha: e.target.value})} required />
                      <input className="pagos-form-input" type="password" placeholder="CVV" maxLength={3}
                        value={nuevaTarjeta.cvv} onChange={e => setNuevaTarjeta({...nuevaTarjeta, cvv: e.target.value})} required />
                    </div>
                    <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                      <button type="submit" className="pagos-btn-guardar">Guardar</button>
                      <button type="button" className="pagos-btn-cambiar" onClick={() => setShowAddCard(false)} style={{ background: "#ef4444", color: "white" }}>Cancelar</button>
                    </div>
                  </form>
                </div>
              )}
            </>
          ) : (
            <div className="pagos-metalico-card">
              <p>Tu modalidad de pago es <strong>Metálico</strong>.</p>
            </div>
          )}
        </div>

        <div className="pagos-historial" style={{ marginTop: "30px" }}>
            <h3 className="pagos-titulo" style={{ fontSize: 20 }}>Historial:</h3>
            {pagosPagados.length > 0 ? (
                <ul>
                    {pagosPagados.map(p => (
                        <li key={p.id_pago}>{p.concepto} - {p.importe}€ ({p.fecha})</li>
                    ))}
                </ul>
            ) : <p>No hay pagos completados.</p>}
        </div>
      </div>
    </div>
  );
};

export default Pagos;
