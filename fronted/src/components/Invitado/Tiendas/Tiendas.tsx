import React, { useState, useEffect } from 'react';
import '../../../style/Invitado/Tienda/Tienda.css';

// URL de la API proporcionada por el usuario
const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface Producto {
  id_material: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

const Tienda: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados de los filtros
  const [buscar, setBuscar] = useState('');
  const [ordenSel, setOrdenSel] = useState('Relevancia');
  const [maxPrecio, setMaxPrecio] = useState(200);

  // Cargar productos con filtros
  useEffect(() => {
    const fetchProductos = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          buscar,
          orden: ordenSel,
          maxPrecio: maxPrecio.toString()
        });
        const response = await fetch(`${API_URL}/api/productos?${query.toString()}`);
        if (response.ok) {
          const data = await response.json();
          setProductos(data);
        }
      } catch (error) {
        console.error('Error al cargar productos:', error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchProductos, 300); // Debounce para búsqueda y slider
    return () => clearTimeout(timeoutId);
  }, [buscar, ordenSel, maxPrecio]);

  // Mapeo de imágenes automáticas por nombre de producto (sin base de datos)
  const getProductoImage = (nombre: string) => {
    const n = nombre.toLowerCase();
    if (n.includes('karategi') || n.includes('uniforme')) return 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=400&auto=format&fit=crop';
    if (n.includes('proteccion') || n.includes('set') || n.includes('guantillas') || n.includes('espinilleras')) return 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=400&auto=format&fit=crop';
    if (n.includes('cinturon')) return 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=400&auto=format&fit=crop';
    if (n.includes('camiseta')) return 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop';
    if (n.includes('mochila')) return 'https://images.unsplash.com/photo-1553062407-98eebec4c2a1?q=80&w=400&auto=format&fit=crop';
    if (n.includes('botella')) return 'https://images.unsplash.com/photo-1602143399827-7211bb3a058e?q=80&w=400&auto=format&fit=crop';
    if (n.includes('toalla')) return 'https://images.unsplash.com/photo-1583912267550-d44d7a125e7e?q=80&w=400&auto=format&fit=crop';
    if (n.includes('saco') || n.includes('makiwara')) return 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=400&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=400&auto=format&fit=crop';
  };

  return (
    <div className="tienda-container">
      {/* Cabecera */}
      <header className="tienda-header">
        <div className="tienda-header__title-group">
          <img src="https://cdn-icons-png.flaticon.com/512/1162/1162499.png" alt="Icono Tienda" className="tienda-header__icon" />
          <h1 className="tienda-header__title">Tienda Oficial</h1>
        </div>
        <h2 className="tienda-header__subtitle">
          Aquí puedes comprar uniformes, protecciones y material oficial del dojo.
        </h2>
      </header>

      {/* Barra de Filtros */}
      <section className="tienda-filters">
        <div className="tienda-filters__grid">
          <div className="filter-group">
            <label>🔍 Buscar Producto</label>
            <div className="filter-input-wrapper">
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={buscar}
                onChange={(e) => setBuscar(e.target.value)}
              />
              <button className="filter-icon-btn">🔍</button>
            </div>
          </div>

          <div className="filter-group">
            <label>Ordenar por:</label>
            <div className="filter-input-wrapper">
              <select value={ordenSel} onChange={(e) => setOrdenSel(e.target.value)}>
                <option value="Relevancia">Relevancia</option>
                <option value="Precio: Menor a Mayor">Precio: Menor a Mayor</option>
                <option value="Precio: Mayor a Menor">Precio: Mayor a Menor</option>
              </select>
              <div className="filter-icon-btn">▼</div>
            </div>
          </div>
        </div>

        <div className="price-range-group">
          <div className="price-range-labels">
            <span>Precio: 0€ - {maxPrecio}€</span>
          </div>
          <input 
            type="range" 
            className="price-slider" 
            min="0" 
            max="200" 
            step="5"
            value={maxPrecio}
            onChange={(e) => setMaxPrecio(parseInt(e.target.value))}
          />
        </div>
      </section>

      {/* Cuadrícula de Productos */}
      {loading ? (
        <div style={{textAlign: 'center', padding: '50px'}}>Cargando productos...</div>
      ) : (
        <div className="productos-grid">
          {productos.map(producto => (
            <article key={producto.id_material} className="producto-card">
              <div className="producto-card__image-container">
                <img 
                  src={getProductoImage(producto.nombre)} 
                  alt={producto.nombre} 
                  className="producto-card__image" 
                />
              </div>
              <div className="producto-card__info">
                <h3 className="producto-card__title">{producto.nombre}</h3>
                <p className="producto-card__desc">{producto.descripcion}</p>
                <div className="producto-card__price">{Number(producto.precio).toFixed(2)}€</div>
                <div className={`producto-card__stock ${producto.stock > 0 ? 'stock--in' : 'stock--out'}`}>
                  {producto.stock > 0 ? `Stock: ${producto.stock} unidades` : 'Sin stock'}
                </div>
                <button className="producto-card__button" disabled={producto.stock <= 0}>
                  {producto.stock > 0 ? 'Ver Producto' : 'Agotado'}
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tienda;
