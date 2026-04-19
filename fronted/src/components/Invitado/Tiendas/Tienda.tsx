import React, { useEffect, useState, useMemo } from "react";
import type { Material } from "../../../tipos/material";
import "../../../style/Invitado/Tienda.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const Tienda: React.FC = () => {
  const [productos, setProductos] = useState<Material[]>([]);
  const [loading, setLoading]     = useState(true);
  const [error, setError]         = useState(false);

  // Filtros
  const [busqueda, setBusqueda]     = useState("");
  const [categoria, setCategoria]   = useState("Todos");
  const [talla, setTalla]           = useState("Todas");
  const [orden, setOrden]           = useState("Relevancia");
  const [precioMax, setPrecioMax]   = useState(200);

  useEffect(() => {
    fetch(`${API_URL}/api/material`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Material[]) => {
        setProductos(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  // Categorías y tallas únicas para los selects
  const categorias = useMemo(() => {
    const cats = [...new Set(productos.map((p) => p.Categoria).filter(Boolean))];
    return ["Todos", ...cats];
  }, [productos]);

  const tallas = useMemo(() => {
    const ts = new Set<string>();
    productos.forEach((p) => {
      if (p.Talla) p.Talla.split(",").forEach((t) => ts.add(t.trim()));
    });
    return ["Todas", ...Array.from(ts)];
  }, [productos]);

  // Filtrado
  const productosFiltrados = useMemo(() => {
    let lista = [...productos];

    if (busqueda)
      lista = lista.filter((p) =>
        p.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );

    if (categoria !== "Todos")
      lista = lista.filter((p) => p.Categoria === categoria);

    if (talla !== "Todas")
      lista = lista.filter((p) => p.Talla?.includes(talla));

    lista = lista.filter((p) => p.precio <= precioMax);

    if (orden === "Precio: menor a mayor")
      lista.sort((a, b) => a.precio - b.precio);
    else if (orden === "Precio: mayor a menor")
      lista.sort((a, b) => b.precio - a.precio);
    else if (orden === "Nombre")
      lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    return lista;
  }, [productos, busqueda, categoria, talla, precioMax, orden]);

  if (loading)
    return (
      <div className="tienda-section" style={{ padding: 48, textAlign: "center", color: "#6b7280" }}>
        Cargando tienda...
      </div>
    );

  if (error)
    return (
      <div className="tienda-section" style={{ padding: 48, textAlign: "center", color: "#ef4444" }}>
        No se pudo cargar la tienda. Inténtalo más tarde.
      </div>
    );

  return (
    <div className="tienda-section">

      {/* Hero */}
      <div className="tienda-hero">
        <div className="tienda-hero-content">
          <h1 className="tienda-titulo">
            <span className="tienda-titulo-emoji">🛍️</span>
            Tienda Oficial
          </h1>
          <p className="tienda-subtitulo">
            Aquí puedes comprar uniformes, protecciones y material oficial del dojo.
          </p>
        </div>
      </div>

      {/* Filtros */}
      <div className="tienda-filtros">
        <div className="tienda-filtros-row">

          <div className="tienda-filtro-grupo">
            <span className="tienda-filtro-label">Buscar Producto</span>
            <input
              className="tienda-filtro-input"
              type="text"
              placeholder="Buscar..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          <div className="tienda-filtro-grupo">
            <span className="tienda-filtro-label">Categoría</span>
            <select
              className="tienda-filtro-select"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="tienda-filtro-grupo">
            <span className="tienda-filtro-label">Tallas</span>
            <select
              className="tienda-filtro-select"
              value={talla}
              onChange={(e) => setTalla(e.target.value)}
            >
              {tallas.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="tienda-filtro-grupo">
            <span className="tienda-filtro-label">Ordenar por</span>
            <select
              className="tienda-filtro-select"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option>Relevancia</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
              <option>Nombre</option>
            </select>
          </div>

        </div>

        <div className="tienda-filtros-row">
          <div className="tienda-filtro-grupo">
            <span className="tienda-filtro-label">Precio máximo</span>
            <input
              type="range"
              min={0}
              max={200}
              value={precioMax}
              onChange={(e) => setPrecioMax(Number(e.target.value))}
              style={{ accentColor: "#b8860b" }}
            />
            <span className="tienda-precio-label">Precio: 0€ – {precioMax}€</span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="tienda-inner">
        <div className="tienda-grid">
          {productosFiltrados.length === 0 ? (
            <div className="tienda-sin-resultados">
              No se encontraron productos con los filtros seleccionados.
            </div>
          ) : (
            productosFiltrados.map((p) => (
              <div className="producto-card" key={p.id_material}>
                <div className="producto-img-wrap">
                  <img
                    src={p.Imagen || "https://via.placeholder.com/300x200?text=Sin+imagen"}
                    alt={p.nombre}
                    className="producto-img"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/300x200?text=Sin+imagen";
                    }}
                  />
                </div>
                <div className="producto-info">
                  <span className="producto-categoria">{p.Categoria}</span>
                  <p className="producto-nombre">{p.nombre}</p>
                  <p className="producto-desc">{p.descripcion}</p>
                  <p className="producto-precio">{Number(p.precio).toFixed(2)}€</p>
                </div>
                <button className="producto-btn">Ver Producto</button>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
};

export default Tienda;