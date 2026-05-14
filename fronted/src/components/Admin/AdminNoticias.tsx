import React, { useEffect, useState } from "react";
import "./AdminTabla.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  categoria: string;
  fecha: string;
  enlace: string;
}

const vacia: Omit<Noticia,"id"> = { titulo:"", contenido:"", categoria:"General", fecha: new Date().toISOString().split("T")[0], enlace:"" };

const AdminNoticias: React.FC = () => {
  const [noticias, setNoticias]   = useState<Noticia[]>([]);
  const [modal, setModal]         = useState(false);
  const [editando, setEditando]   = useState<Noticia | null>(null);
  const [form, setForm]           = useState<Omit<Noticia,"id">>(vacia);
  const [loading, setLoading]     = useState(true);

  const cargar = () => {
    fetch(`${API_URL}/api/admin/noticias`)
      .then(r => r.json())
      .then(data => { setNoticias(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const abrir = (n?: Noticia) => {
    if (n) { setEditando(n); setForm({ titulo:n.titulo, contenido:n.contenido, categoria:n.categoria, fecha:n.fecha?.split("T")[0], enlace:n.enlace }); }
    else   { setEditando(null); setForm(vacia); }
    setModal(true);
  };

  const guardar = async () => {
    if (editando) {
      await fetch(`${API_URL}/api/admin/noticias/${editando.id}`, {
        method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
      });
    } else {
      await fetch(`${API_URL}/api/admin/noticias`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
      });
    }
    setModal(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar esta noticia?")) return;
    await fetch(`${API_URL}/api/admin/noticias/${id}`, { method:"DELETE" });
    cargar();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-inner">
        <div className="admin-page-header">
          <h1 className="admin-page-titulo">📰 Gestión de Noticias</h1>
          <button className="admin-btn-nuevo" onClick={() => abrir()}>+ Nueva noticia</button>
        </div>

        <div className="admin-tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr><th>Título</th><th>Categoría</th><th>Fecha</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="admin-vacio">Cargando...</td></tr>
              ) : noticias.length === 0 ? (
                <tr><td colSpan={4} className="admin-vacio">Sin noticias</td></tr>
              ) : noticias.map(n => (
                <tr key={n.id}>
                  <td>{n.titulo}</td>
                  <td><span className="admin-badge azul">{n.categoria}</span></td>
                  <td>{n.fecha ? new Date(n.fecha).toLocaleDateString("es-ES") : "—"}</td>
                  <td>
                    <button className="admin-btn-edit" onClick={() => abrir(n)}>✏️ Editar</button>
                    <button className="admin-btn-delete" onClick={() => eliminar(n.id)}>🗑️ Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modal && (
          <div className="admin-modal-backdrop" onClick={() => setModal(false)}>
            <div className="admin-modal" style={{maxWidth:640}} onClick={e => e.stopPropagation()}>
              <h3 className="admin-modal-titulo">{editando ? "✏️ Editar Noticia" : "+ Nueva Noticia"}</h3>
              <div className="admin-form-grid">
                <div className="admin-form-field full">
                  <label className="admin-form-label">Título</label>
                  <input className="admin-form-input" value={form.titulo}
                    onChange={e => setForm({...form, titulo:e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Categoría</label>
                  <select className="admin-form-select" value={form.categoria}
                    onChange={e => setForm({...form, categoria:e.target.value})}>
                    {["General","Evento","Comunicado","Torneo","Novedad"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Fecha</label>
                  <input className="admin-form-input" type="date" value={form.fecha}
                    onChange={e => setForm({...form, fecha:e.target.value})} />
                </div>
                <div className="admin-form-field full">
                  <label className="admin-form-label">Enlace</label>
                  <input className="admin-form-input" placeholder="https://..." value={form.enlace}
                    onChange={e => setForm({...form, enlace:e.target.value})} />
                </div>
                <div className="admin-form-field full">
                  <label className="admin-form-label">Contenido</label>
                  <textarea className="admin-form-textarea" rows={5} value={form.contenido}
                    onChange={e => setForm({...form, contenido:e.target.value})} />
                </div>
              </div>
              <div className="admin-modal-btns">
                <button className="admin-btn-guardar" onClick={guardar}>Guardar</button>
                <button className="admin-btn-cancelar" onClick={() => setModal(false)}>Cancelar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNoticias;
