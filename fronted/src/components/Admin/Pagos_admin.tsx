import React, {useEffect, useState} from "react";
import "../../style/Admin/Admintabla.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Pago {
  id_pago:   number;
  tipo:      string; 
  precio:    number;
  f_pago:    string;
  estado:    string;
  nombre:    string;
  apellido:  string;
}

const Pagos_Admin: React.FC = () => {
  const [pagos, setPagos]        = useState<Pago[]>([]);
  const [filtro, setFiltro]      = useState("TODOS");
  const [busqueda, setBusqueda]  = useState("");
  const [loading, setLoading]    = useState(true);

  const cargar = () =>{
    fetch(`${API_URL}/api/admin/pagos`)
      .then(r => r.json())
      .then(data => { setPagos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };
 useEffect(() => { cargar(); }, []);
 
  const cambiarEstado = async (id: number, estado: string) => {
    await fetch(`${API_URL}/api/admin/pagos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ estado }),
    });
    cargar();
  };
 
  const formatFecha = (f: string) => {
    if (!f) return "—";
    return new Date(f).toLocaleDateString("es-ES");
  };
 
const filtrados = pagos.filter(p => {
  // Comparamos el estado del pago (en mayúsculas) con el valor del filtro
  const estadoNorm = p.estado?.toUpperCase() === 'PAGADO' ? 'COMPLETADO' : p.estado?.toUpperCase();
  const matchFiltro = filtro === "TODOS" || estadoNorm === filtro;
  const matchBusqueda = `${p.nombre} ${p.apellido}`.toLowerCase().includes(busqueda.toLowerCase());
  return matchFiltro && matchBusqueda;
});
 
  const totalPendiente  = pagos.filter(p => p.estado.toUpperCase() === "PENDIENTE").reduce((a, p) => a + Number(p.precio), 0);
  const totalCompletado = pagos.filter(p => ['COMPLETADO','PAGADO'].includes(p.estado.toUpperCase())).reduce((a, p) => a + Number(p.precio), 0);
 
  return (
    <div className="admin-page">
      <div className="admin-page-inner">
 
        <div className="admin-page-header">
          <h1 className="admin-page-titulo">💰 Gestión de Pagos</h1>
          <input className="admin-buscador" placeholder="Buscar alumno..."
            value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        </div>
 
        {/* Resumen */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:24}}>
          {[
            { label:"Total pagos", valor: pagos.length, color:"#111" },
            { label:"Pendiente", valor: `${totalPendiente.toFixed(2)}€`, color:"#ca8a04" },
            { label:"Cobrado", valor: `${totalCompletado.toFixed(2)}€`, color:"#16a34a" },
          ].map(s => (
            <div key={s.label} style={{background:"#fff", border:"1px solid #e5e7eb", borderRadius:8, padding:"16px 20px"}}>
              <div style={{fontSize:22, fontWeight:800, color:s.color}}>{s.valor}</div>
              <div style={{fontSize:12, color:"#6b7280"}}>{s.label}</div>
            </div>
          ))}
        </div>
 
        {/* Filtros */}
        <div style={{display:"flex", gap:8, marginBottom:16}}>
          {["TODOS","PENDIENTE","COMPLETADO"].map(f => (
            <button key={f} onClick={() => setFiltro(f)}
              style={{padding:"6px 16px", borderRadius:4, border:"1px solid #e5e7eb",
                background: filtro === f ? "#cc0000" : "#fff",
                color: filtro === f ? "#fff" : "#374151",
                fontWeight:600, fontSize:12, cursor:"pointer"}}>
              {f}
            </button>
          ))}
        </div>
 
        <div className="admin-tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr><th>Alumno</th><th>Tipo</th><th>Importe</th><th>Fecha</th><th>Estado</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="admin-vacio">Cargando...</td></tr>
              ) : filtrados.length === 0 ? (
                <tr><td colSpan={6} className="admin-vacio">Sin pagos</td></tr>
              ) : filtrados.map(p => (
                <tr key={p.id_pago}>
                  <td>{p.nombre} {p.apellido}</td>
                  <td>{p.tipo}</td>
                  <td>{Number(p.precio).toFixed(2)}€</td>
                  <td>{formatFecha(p.f_pago)}</td>
                  <td>
                    <span className={`admin-badge ${['COMPLETADO','PAGADO'].includes(p.estado.toUpperCase()) ? 'verde' : 'amarillo'}`}>
                      {['COMPLETADO','PAGADO'].includes(p.estado.toUpperCase()) ? '✅ Pagado' : '⏳ Pendiente'}
                    </span>
                  </td>
                  <td>
                    {p.estado.toUpperCase() === 'PENDIENTE' && (
                      <button className="admin-btn-accion"
                        onClick={() => cambiarEstado(p.id_pago, 'COMPLETADO')}>
                        ✅ Marcar pagado
                      </button>
                    )}
                    {['COMPLETADO','PAGADO'].includes(p.estado.toUpperCase()) && (
                      <button className="admin-btn-edit"
                        onClick={() => cambiarEstado(p.id_pago, 'PENDIENTE')}>
                        ↩ Revertir
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
 
export default Pagos_Admin;