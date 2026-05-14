import React, { useEffect, useState } from "react";
import "../../style/Admin/Admintabla.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";
const DIAS = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];

interface Horario {
  id_horario: number;
  dia: string;
  hora: string;
  tipo_clase: string;
  dojo: string;
  alumno_nombre: string;
  alumno_apellido: string;
  sensei_nombre: string;
}

interface NuevoHorario {
  dia: string; hora: string; tipo_clase: string;
  dojo: string; id_usuario: string; sensei: string;
}

const Horarios_admin: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading]   = useState(true);
  const [modal, setModal]       = useState(false);
  const [nuevo, setNuevo]       = useState<NuevoHorario>({
    dia:"Lunes", hora:"", tipo_clase:"", dojo:"", id_usuario:"", sensei:""
  });

  const cargar = () => {
    fetch(`${API_URL}/api/admin/horarios`)
      .then(r => r.json())
      .then(data => { setHorarios(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const crear = async () => {
    await fetch(`${API_URL}/api/admin/horarios`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    setModal(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar este horario?")) return;
    await fetch(`${API_URL}/api/admin/horarios/${id}`, { method: "DELETE" });
    cargar();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-inner">
        <div className="admin-page-header">
          <h1 className="admin-page-titulo">📅 Gestión de Horarios</h1>
          <button className="admin-btn-nuevo" onClick={() => setModal(true)}>+ Nuevo horario</button>
        </div>

        <div className="admin-tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr><th>Día</th><th>Hora</th><th>Tipo</th><th>Dojo</th><th>Alumno</th><th>Sensei</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="admin-vacio">Cargando...</td></tr>
              ) : horarios.length === 0 ? (
                <tr><td colSpan={7} className="admin-vacio">Sin horarios</td></tr>
              ) : horarios.map(h => (
                <tr key={h.id_horario}>
                  <td><span className="admin-badge azul">{h.dia}</span></td>
                  <td>{h.hora?.slice(0,5)}</td>
                  <td>{h.tipo_clase}</td>
                  <td>{h.dojo}</td>
                  <td>{h.alumno_nombre} {h.alumno_apellido}</td>
                  <td>{h.sensei_nombre || "—"}</td>
                  <td>
                    <button className="admin-btn-delete" onClick={() => eliminar(h.id_horario)}>🗑️ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modal && (
          <div className="admin-modal-backdrop" onClick={() => setModal(false)}>
            <div className="admin-modal" onClick={e => e.stopPropagation()}>
              <h3 className="admin-modal-titulo">+ Nuevo Horario</h3>
              <div className="admin-form-grid">
                <div className="admin-form-field">
                  <label className="admin-form-label">Día</label>
                  <select className="admin-form-select" value={nuevo.dia}
                    onChange={e => setNuevo({...nuevo, dia: e.target.value})}>
                    {DIAS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Hora</label>
                  <input className="admin-form-input" type="time" value={nuevo.hora}
                    onChange={e => setNuevo({...nuevo, hora: e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Tipo de clase</label>
                  <input className="admin-form-input" placeholder="Clase infantil"
                    value={nuevo.tipo_clase} onChange={e => setNuevo({...nuevo, tipo_clase: e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Dojo</label>
                  <input className="admin-form-input" placeholder="Dojo principal"
                    value={nuevo.dojo} onChange={e => setNuevo({...nuevo, dojo: e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">ID Usuario alumno</label>
                  <input className="admin-form-input" type="number" placeholder="1"
                    value={nuevo.id_usuario} onChange={e => setNuevo({...nuevo, id_usuario: e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">ID Sensei</label>
                  <input className="admin-form-input" type="number" placeholder="2"
                    value={nuevo.sensei} onChange={e => setNuevo({...nuevo, sensei: e.target.value})} />
                </div>
              </div>
              <div className="admin-modal-btns">
                <button className="admin-btn-guardar" onClick={crear}>Crear</button>
                <button className="admin-btn-cancelar" onClick={() => setModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Horarios_admin;
