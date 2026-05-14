import React, { useEffect, useState } from "react";
import "../../style/Admin/Admintabla.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";
 
interface Alumno {
  id_alumno: number;
  dni: string;
  nombre: string;
  apellido: string;
  f_nacimiento: string;
  nivel: string;
  email: string;
  metodo_pago: string;
}
 
const AdminAlumnos: React.FC = () => {
  const [alumnos, setAlumnos]     = useState<Alumno[]>([]);
  const [busqueda, setBusqueda]   = useState("");
  const [editando, setEditando]   = useState<Alumno | null>(null);
  const [loading, setLoading]     = useState(true);
 
  const cargar = () => {
    fetch(`${API_URL}/api/admin/alumnos`)
      .then(r => r.json())
      .then(data => { setAlumnos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };
 
  useEffect(() => { cargar(); }, []);
 
  const guardar = async () => {
    if (!editando) return;
    await fetch(`${API_URL}/api/admin/alumnos/${editando.id_alumno}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editando),
    });
    setEditando(null);
    cargar();
  };
 
  const filtrados = alumnos.filter(a =>
    `${a.nombre} ${a.apellido} ${a.dni}`.toLowerCase().includes(busqueda.toLowerCase())
  );
 
  return (
    <div className="admin-page">
      <div className="admin-page-inner">
        <div className="admin-page-header">
          <h1 className="admin-page-titulo">👥 Gestión de Alumnos</h1>
          <input className="admin-buscador" placeholder="Buscar por nombre o DNI..."
            value={busqueda} onChange={e => setBusqueda(e.target.value)} />
        </div>
 
        <div className="admin-tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr>
                <th>Nombre</th><th>DNI</th><th>Nivel</th>
                <th>Email</th><th>Pago</th><th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="admin-vacio">Cargando...</td></tr>
              ) : filtrados.length === 0 ? (
                <tr><td colSpan={6} className="admin-vacio">Sin alumnos</td></tr>
              ) : filtrados.map(a => (
                <tr key={a.id_alumno}>
                  <td>{a.nombre} {a.apellido}</td>
                  <td>{a.dni}</td>
                  <td><span className="admin-badge azul">{a.nivel}</span></td>
                  <td>{a.email || "—"}</td>
                  <td>{a.metodo_pago || "—"}</td>
                  <td>
                    <button className="admin-btn-edit" onClick={() => setEditando(a)}>✏️ Editar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
 
        {/* Modal editar */}
        {editando && (
          <div className="admin-modal-backdrop" onClick={() => setEditando(null)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <h3 className="admin-modal-titulo">✏️ Editar Alumno</h3>
              <div className="admin-form-grid">
                {[["Nombre","nombre"],["Apellido","apellido"],["DNI","dni"],["Nivel","nivel"]].map(([label, key]) => (
                  <div className="admin-form-field" key={key}>
                    <label className="admin-form-label">{label}</label>
                    <input className="admin-form-input"
                      value={(editando as any)[key] || ""}
                      onChange={e => setEditando({...editando, [key]: e.target.value} as Alumno)} />
                  </div>
                ))}
              </div>
              <div className="admin-modal-btns">
                <button className="admin-btn-guardar" onClick={guardar}>Guardar</button>
                <button className="admin-btn-cancelar" onClick={() => setEditando(null)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default AdminAlumnos;
