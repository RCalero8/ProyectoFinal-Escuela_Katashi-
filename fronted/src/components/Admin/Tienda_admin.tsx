import React, { useEffect, useState } from "react";
import "../../style/Admin/Admintabla.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Producto {
  id_material: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  Categoria: string;
  Imagen: string;
  Talla: string;
  Color: string;
}

const vacio: Omit<Producto,"id_material"> = {
  nombre:"", descripcion:"", precio:0, stock:0,
  Categoria:"", Imagen:"", Talla:"", Color:""
};

const Tienda_admin: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [modal, setModal]         = useState(false);
  const [editando, setEditando]   = useState<Producto | null>(null);
  const [form, setForm]           = useState<Omit<Producto,"id_material">>(vacio);
  const [loading, setLoading]     = useState(true);

  const cargar = () => {
    fetch(`${API_URL}/api/admin/tienda`)
      .then(r => r.json())
      .then(data => { setProductos(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { cargar(); }, []);

  const abrir = (p?: Producto) => {
    if (p) { setEditando(p); setForm({ nombre:p.nombre, descripcion:p.descripcion, precio:p.precio, stock:p.stock, Categoria:p.Categoria, Imagen:p.Imagen, Talla:p.Talla, Color:p.Color }); }
    else   { setEditando(null); setForm(vacio); }
    setModal(true);
  };

  const guardar = async () => {
    if (editando) {
      await fetch(`${API_URL}/api/admin/tienda/${editando.id_material}`, {
        method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
      });
    } else {
      await fetch(`${API_URL}/api/admin/tienda`, {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form),
      });
    }
    setModal(false);
    cargar();
  };

  const eliminar = async (id: number) => {
    if (!confirm("¿Eliminar este producto?")) return;
    await fetch(`${API_URL}/api/admin/tienda/${id}`, { method:"DELETE" });
    cargar();
  };

  return (
    <div className="admin-page">
      <div className="admin-page-inner">
        <div className="admin-page-header">
          <h1 className="admin-page-titulo">🛍️ Gestión de Tienda</h1>
          <button className="admin-btn-nuevo" onClick={() => abrir()}>+ Nuevo producto</button>
        </div>

        <div className="admin-tabla-wrap">
          <table className="admin-tabla">
            <thead>
              <tr><th>Imagen</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="admin-vacio">Cargando...</td></tr>
              ) : productos.length === 0 ? (
                <tr><td colSpan={6} className="admin-vacio">Sin productos</td></tr>
              ) : productos.map(p => (
                <tr key={p.id_material}>
                  <td>
                    <img src={p.Imagen} alt={p.nombre}
                      style={{width:48, height:48, objectFit:"cover", borderRadius:6}}
                      onError={(e) => { (e.target as HTMLImageElement).src = "https://via.placeholder.com/48"; }} />
                  </td>
                  <td>{p.nombre}</td>
                  <td><span className="admin-badge azul">{p.Categoria}</span></td>
                  <td>{Number(p.precio).toFixed(2)}€</td>
                  <td>
                    <span className={`admin-badge ${p.stock > 5 ? "verde" : p.stock > 0 ? "amarillo" : "rojo"}`}>
                      {p.stock} uds
                    </span>
                  </td>
                  <td>
                    <button className="admin-btn-edit" onClick={() => abrir(p)}>✏️ Editar</button>
                    <button className="admin-btn-delete" onClick={() => eliminar(p.id_material)}>🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modal && (
          <div className="admin-modal-backdrop" onClick={() => setModal(false)}>
            <div className="admin-modal" style={{maxWidth:640}} onClick={e => e.stopPropagation()}>
              <h3 className="admin-modal-titulo">{editando ? "✏️ Editar Producto" : "+ Nuevo Producto"}</h3>
              <div className="admin-form-grid">
                <div className="admin-form-field full">
                  <label className="admin-form-label">Nombre</label>
                  <input className="admin-form-input" value={form.nombre}
                    onChange={e => setForm({...form, nombre:e.target.value})} />
                </div>
                <div className="admin-form-field full">
                  <label className="admin-form-label">Descripción</label>
                  <textarea className="admin-form-textarea" rows={3} value={form.descripcion}
                    onChange={e => setForm({...form, descripcion:e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Precio (€)</label>
                  <input className="admin-form-input" type="number" value={form.precio}
                    onChange={e => setForm({...form, precio:Number(e.target.value)})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Stock</label>
                  <input className="admin-form-input" type="number" value={form.stock}
                    onChange={e => setForm({...form, stock:Number(e.target.value)})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Categoría</label>
                  <select className="admin-form-select" value={form.Categoria}
                    onChange={e => setForm({...form, Categoria:e.target.value})}>
                    {["Uniforme","Protección","Cinturón","Accesorio"].map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Tallas</label>
                  <input className="admin-form-input" placeholder="XS,S,M,L,XL" value={form.Talla}
                    onChange={e => setForm({...form, Talla:e.target.value})} />
                </div>
                <div className="admin-form-field">
                  <label className="admin-form-label">Color</label>
                  <input className="admin-form-input" placeholder="Azul,Roja" value={form.Color}
                    onChange={e => setForm({...form, Color:e.target.value})} />
                </div>
                <div className="admin-form-field full">
                  <label className="admin-form-label">URL Imagen</label>
                  <input className="admin-form-input" placeholder="https://..." value={form.Imagen}
                    onChange={e => setForm({...form, Imagen:e.target.value})} />
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

export default Tienda_admin;
