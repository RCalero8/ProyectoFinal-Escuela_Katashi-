import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Material } from "../../tipos/material";

type CartItem = Material & {
  cantidad: number;
  talla?: string;
  color?: string;
};

const Carrito: React.FC = () => {
  const [carrito, setCarrito] = useState<CartItem[]>([]);
  const [mensaje, setMensaje] = useState<string>("");
  const navigate = useNavigate();

  const getCartKey = () => {
    const usuario = JSON.parse(localStorage.getItem("usuario") ?? "null");
    const userKey = usuario?.nombre || usuario?.email || "usuario";
    return `carrito_${userKey}`;
  };

  const cargarCarrito = (): CartItem[] => {
    try {
      return JSON.parse(localStorage.getItem(getCartKey()) ?? "[]");
    } catch {
      return [];
    }
  };

  const guardarCarrito = (items: CartItem[]) => {
    localStorage.setItem(getCartKey(), JSON.stringify(items));
  };

  useEffect(() => {
    setCarrito(cargarCarrito());
  }, []);

  const total = carrito.reduce((sum, item) => sum + Number(item.precio) * item.cantidad, 0);

  const eliminarItem = (id: number, talla?: string, color?: string) => {
    const actualizado = carrito.filter(
      (item) => !(item.id_material === id && item.talla === talla && item.color === color)
    );
    guardarCarrito(actualizado);
    setCarrito(actualizado);
  };

  const handleCheckout = () => {
    if (carrito.length === 0) {
      setMensaje("El carrito está vacío.");
      return;
    }

    guardarCarrito([]);
    setCarrito([]);
    setMensaje("Compra realizada con éxito. Te esperamos en el dojo para recoger tu pedido.");
  };

  const irAProducto = (id: number) => {
    navigate(`/usuario/tienda/${id}`);
  };

  return (
    <div className="carrito-section" style={{ padding: 24, maxWidth: 940, margin: "0 auto" }}>
      <h1>Tu carrito</h1>
      {mensaje && (
        <div style={{ marginBottom: 16, padding: 12, backgroundColor: "#eef2ff", borderRadius: 8 }}>
          {mensaje}
        </div>
      )}

      {carrito.length === 0 ? (
        <div style={{ padding: 24, textAlign: "center", color: "#4b5563" }}>
          Tu carrito está vacío.
          <button
            style={{
              marginTop: 16,
              padding: "10px 20px",
              backgroundColor: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
            }}
            onClick={() => navigate("/usuario/tienda")}
          >
            Ir a la tienda
          </button>
        </div>
      ) : (
        <>
          <div style={{ display: "grid", gap: 16 }}>
            {carrito.map((item) => (
              <div
                key={`${item.id_material}-${item.talla || "default"}-${item.color || "default"}`}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr auto",
                  gap: 16,
                  padding: 18,
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  alignItems: "center",
                }}
              >
                <img
                  src={item.Imagen || "https://via.placeholder.com/120x120?text=Sin+imagen"}
                  alt={item.nombre}
                  style={{ width: 120, height: 120, objectFit: "cover", borderRadius: 10 }}
                />
                <div>
                  <h2 style={{ margin: 0 }}>{item.nombre}</h2>
                  <p style={{ margin: "8px 0", color: "#6b7280" }}>{item.Categoria}</p>
                  <p style={{ margin: 0 }}><strong>Precio:</strong> {Number(item.precio).toFixed(2)}€</p>
                  <p style={{ margin: "8px 0 0" }}><strong>Cantidad:</strong> {item.cantidad}</p>
                  {item.talla && <p style={{ margin: "4px 0 0" }}><strong>Talla:</strong> {item.talla}</p>}
                  {item.color && <p style={{ margin: "4px 0 0" }}><strong>Color:</strong> {item.color}</p>}
                </div>
                <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
                  <button
                    style={{
                      padding: "10px 14px",
                      backgroundColor: "#4f46e5",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => irAProducto(item.id_material)}
                  >
                    Ver producto
                  </button>
                  <button
                    style={{
                      padding: "10px 14px",
                      backgroundColor: "#dc2626",
                      color: "white",
                      border: "none",
                      borderRadius: 8,
                      cursor: "pointer",
                    }}
                    onClick={() => eliminarItem(item.id_material, item.talla, item.color)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Total: {Number(total).toFixed(2)}€</div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                style={{
                  padding: "12px 22px",
                  backgroundColor: "#10b981",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
                onClick={handleCheckout}
              >
                Pagar ahora
              </button>
              <button
                style={{
                  padding: "12px 22px",
                  backgroundColor: "#374151",
                  color: "white",
                  border: "none",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/usuario/tienda")}
              >
                Seguir comprando
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
