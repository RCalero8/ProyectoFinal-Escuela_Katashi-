import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import type { Material } from "../../../tipos/material";
import "../../../style/Invitado/Tienda/Detalleproducto.css";

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [producto, setProducto]         = useState<Material | null>(null);
  const [relacionados, setRelacionados] = useState<Material[]>([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(false);
  const [tallaActiva, setTallaActiva]   = useState<string>("");
  const [cantidad, setCantidad]         = useState(1);
  const [imgActiva, setImgActiva]       = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);
    setImgActiva(0);
    setCantidad(1);

    fetch(`${API_URL}/api/material/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data: Material) => {
        setProducto(data);
        // Talla por defecto: la primera
        if (data.Talla) {
          const tallas = data.Talla.split(",").map((t) => t.trim());
          setTallaActiva(tallas[0]);
        }
        // Cargar relacionados (misma categoría)
        return fetch(`${API_URL}/api/material`);
      })
      .then((res) => res?.json())
      .then((todos: Material[]) => {
        if (todos && producto) {
          const rel = todos.filter(
            (p) => p.Categoria === producto.Categoria && p.id_material !== producto.id_material
          ).slice(0, 4);
          setRelacionados(rel);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  // Segundo useEffect para relacionados cuando producto ya está cargado
  useEffect(() => {
    if (!producto) return;
    fetch(`${API_URL}/api/material`)
      .then((res) => res.json())
      .then((todos: Material[]) => {
        const rel = todos
          .filter((p) => p.Categoria === producto.Categoria && p.id_material !== producto.id_material)
          .slice(0, 4);
        setRelacionados(rel);
      })
      .catch(() => {});
  }, [producto]);

  const getStockLabel = (stock: number) => {
    if (stock === 0) return { label: "Sin stock", clase: "sin-stock" };
    if (stock <= 5) return { label: "Pocas unidades", clase: "pocas" };
    return { label: "En stock", clase: "en-stock" };
  };

  if (loading)
    return (
      <div className="detalle-section" style={{ textAlign: "center", color: "#6b7280" }}>
        Cargando producto...
      </div>
    );

  if (error || !producto)
    return (
      <div className="detalle-section" style={{ textAlign: "center", color: "#ef4444" }}>
        No se pudo cargar el producto.
      </div>
    );

  const tallas = producto.Talla ? producto.Talla.split(",").map((t) => t.trim()) : [];
  const stockInfo = getStockLabel(producto.stock);

  return (
    <div className="detalle-section">
      <div className="detalle-inner">

        {/* Volver */}
        <button className="detalle-volver" onClick={() => navigate(-1)}>
          ← Volver a la tienda
        </button>

        {/* Layout principal */}
        <div className="detalle-layout">

          {/* Columna imágenes */}
          <div>
            <img
              src={producto.Imagen || "https://via.placeholder.com/400x360?text=Sin+imagen"}
              alt={producto.nombre}
              className="detalle-img-principal"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/400x360?text=Sin+imagen";
              }}
            />
            {/* Miniaturas — misma imagen repetida como placeholder */}
            <div className="detalle-thumbs">
              {[0, 1, 2, 3].map((i) => (
                <img
                  key={i}
                  src={producto.Imagen || "https://via.placeholder.com/80?text=img"}
                  alt={`Vista ${i + 1}`}
                  className={`detalle-thumb ${imgActiva === i ? "activo" : ""}`}
                  onClick={() => setImgActiva(i)}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/80?text=img";
                  }}
                />
              ))}
            </div>
          </div>

          {/* Columna info */}
          <div>
            <h1 className="detalle-nombre">{producto.nombre}</h1>

            <div className="detalle-precio-row">
              <span className="detalle-precio">{Number(producto.precio).toFixed(2)}€</span>
              <span className={`detalle-stock ${stockInfo.clase}`}>
                {stockInfo.clase === "en-stock" ? "🟢" : stockInfo.clase === "pocas" ? "🟡" : "🔴"} {stockInfo.label}
              </span>
            </div>

            <p className="detalle-desc-titulo">Descripción</p>
            <p className="detalle-desc">{producto.descripcion}</p>

            {/* Tallas */}
            {tallas.length > 0 && (
              <>
                <p className="detalle-tallas-titulo">Selecciona tu talla</p>
                <div className="detalle-tallas">
                  {tallas.map((t) => (
                    <button
                      key={t}
                      className={`detalle-talla-btn ${tallaActiva === t ? "activo" : ""}`}
                      onClick={() => setTallaActiva(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Cantidad */}
            <p className="detalle-cantidad-titulo">Cantidad</p>
            <div className="detalle-cantidad-row">
              <button
                className="detalle-cantidad-btn"
                onClick={() => setCantidad((c) => Math.max(1, c - 1))}
              >
                -
              </button>
              <span className="detalle-cantidad-num">{cantidad}</span>
              <button
                className="detalle-cantidad-btn"
                onClick={() => setCantidad((c) => Math.min(producto.stock, c + 1))}
              >
                +
              </button>
            </div>

            {/* Aviso recogida */}
            <div className="detalle-aviso">
              🏫 Los pedidos se recogen en el dojo. No hay envío a domicilio.
            </div>

            {/* Botón comprar (deshabilitado) */}
            <button className="detalle-btn-comprar" disabled>
              🟢 Añadir al carrito
            </button>

            {/* Botones secundarios */}
            <div className="detalle-btns-secundarios">
              <button className="detalle-btn-sec">♥ Favoritos</button>
              <button className="detalle-btn-sec">⬆ Compartir</button>
            </div>
          </div>
        </div>

        {/* Productos relacionados */}
        {relacionados.length > 0 && (
          <div className="detalle-relacionados">
            <h2 className="detalle-relacionados-titulo">🔄 Productos relacionados</h2>
            <div className="detalle-relacionados-grid">
              {relacionados.map((p) => {
                const si = getStockLabel(p.stock);
                return (
                  <div
                    className="detalle-rel-card"
                    key={p.id_material}
                    onClick={() => navigate(`/tienda/${p.id_material}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={p.Imagen || "https://via.placeholder.com/200x140?text=img"}
                      alt={p.nombre}
                      className="detalle-rel-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "https://via.placeholder.com/200x140?text=img";
                      }}
                    />
                    <div className="detalle-rel-info">
                      <p className="detalle-rel-nombre">{p.nombre}</p>
                      <p className="detalle-rel-desc">{p.descripcion}</p>
                      <p className="detalle-rel-precio">{Number(p.precio).toFixed(2)}€</p>
                      <span className={`detalle-rel-stock ${si.clase}`}
                        style={{
                          background: si.clase === "en-stock" ? "#dcfce7" : si.clase === "pocas" ? "#fef9c3" : "#fee2e2",
                          color: si.clase === "en-stock" ? "#16a34a" : si.clase === "pocas" ? "#ca8a04" : "#dc2626",
                        }}
                      >
                        {si.clase === "en-stock" ? "🟢" : si.clase === "pocas" ? "🟡" : "🔴"} {si.label}
                      </span>
                      <button className="detalle-rel-btn" disabled>Añadir Carrito</button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default DetalleProducto;