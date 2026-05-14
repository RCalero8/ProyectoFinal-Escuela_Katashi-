import React, { useEffect, useState } from "react";
import "./AdminTabla.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Horario {
  id_horario: number;
  dia: string;
  hora: string;
  tipo_clase: string;
  dojo: string;
}

interface AlumnoAsistencia {
  id_usuario: number;
  nombre: string;
  apellido: string;
  id_asistencia: number | null;
  presente: boolean | null;
}

const AdminAsistencia: React.FC = () => {
  const [horarios, setHorarios]   = useState<Horario[]>([]);
  const [seleccionado, setSeleccionado] = useState<number | null>(null);
  const [fecha, setFecha]         = useState(new Date().toISOString().split("T")[0]);
  const [lista, setLista]         = useState<AlumnoAsistencia[]>([]);
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/admin/horarios`)
      .then(r => r.json())
      .then(data => setHorarios(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const cargarLista = () => {
    if (!seleccionado) return;
    fetch(`${API_URL}/api/admin/asistencia/${seleccionado}/${fecha}`)
      .then(r => r.json())
      .then(data => setLista(Array.isArray(data) ? data : []))
      .catch(() => {});
  };

  useEffect(() => { cargarLista(); }, [seleccionado, fecha]);

  const togglePresente = (id_usuario: number) => {
    setLista(prev => prev.map(a =>
      a.id_usuario === id_usuario ? { ...a, presente: !a.presente } : a
    ));
  };

  const guardar = async () => {
    setGuardando(true);
    await Promise.all(lista.map(a =>
      fetch(`${API_URL}/api/admin/asistencia`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: a.id_usuario,
          id_horario: seleccionado,
          fecha,
          presente: a.presente ?? false,
        }),
      })
    ));
    setGuardando(false);
    alert("✅ Asistencia guardada correctamente");
  };

  const clasesUnicas = horarios.filter((h, i, arr) =>
    arr.findIndex(x => x.id_horario === h.id_horario) === i
  );

  return (
    <div className="admin-page">
      <div className="admin-page-inner">
        <div className="admin-page-header">
          <h1 className="admin-page-titulo">✅ Pasar Lista</h1>
        </div>

        {/* Selector */}
        <div style={{display:"flex", gap:16, marginBottom:24, flexWrap:"wrap"}}>
          <div className="admin-form-field">
            <label className="admin-form-label">Clase</label>
            <select className="admin-form-select" style={{minWidth:240}}
              value={seleccionado || ""}
              onChange={e => setSeleccionado(Number(e.target.value))}>
              <option value="">Selecciona una clase</option>
              {clasesUnicas.map(h => (
                <option key={h.id_horario} value={h.id_horario}>
                  {h.dia} {h.hora?.slice(0,5)} — {h.tipo_clase} ({h.dojo})
                </option>
              ))}
            </select>
          </div>
          <div className="admin-form-field">
            <label className="admin-form-label">Fecha</label>
            <input className="admin-form-input" type="date" value={fecha}
              onChange={e => setFecha(e.target.value)} />
          </div>
        </div>

        {/* Lista */}
        {seleccionado && (
          <>
            <div className="admin-tabla-wrap">
              <table className="admin-tabla">
                <thead>
                  <tr><th>Alumno</th><th>Asistencia</th></tr>
                </thead>
                <tbody>
                  {lista.length === 0 ? (
                    <tr><td colSpan={2} className="admin-vacio">Sin alumnos en esta clase</td></tr>
                  ) : lista.map(a => (
                    <tr key={a.id_usuario}>
                      <td>{a.nombre} {a.apellido}</td>
                      <td>
                        <button
                          onClick={() => togglePresente(a.id_usuario)}
                          style={{
                            padding:"6px 16px", borderRadius:4, border:"none",
                            background: a.presente ? "#dcfce7" : "#fee2e2",
                            color: a.presente ? "#16a34a" : "#dc2626",
                            fontWeight:700, fontSize:13, cursor:"pointer"
                          }}>
                          {a.presente ? "✅ Presente" : "❌ Ausente"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {lista.length > 0 && (
              <button className="admin-btn-nuevo" style={{marginTop:16}}
                onClick={guardar} disabled={guardando}>
                {guardando ? "Guardando..." : "💾 Guardar asistencia"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminAsistencia;
