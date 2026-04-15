import React from 'react';
import '../../../style/Invitado/Tienda/ProductCard.css';

interface ProductCardProps {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ nombre, descripcion, precio, stock }) => {
  // Mapeo de imágenes automáticas por nombre de producto
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
    if (n.includes('protector de pecho')) return 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?q=80&w=400&auto=format&fit=crop';
    return 'https://images.unsplash.com/photo-1555597673-b21d5c935865?q=80&w=400&auto=format&fit=crop';
  };

  return (
    <article className="producto-card">
      <div className="producto-card__image-container">
        <img 
          src={getProductoImage(nombre)} 
          alt={nombre} 
          className="producto-card__image" 
        />
      </div>
      <div className="producto-card__info">
        <h3 className="producto-card__title">{nombre}</h3>
        <p className="producto-card__desc">{descripcion}</p>
        <div className="producto-card__price">{Number(precio).toFixed(2)}€</div>
        <div className={`producto-card__stock ${stock > 0 ? 'stock--in' : 'stock--out'}`}>
          {stock > 0 ? `Stock: ${stock} unidades` : 'Sin stock'}
        </div>
        <button className="producto-card__button" disabled={stock <= 0}>
          {stock > 0 ? 'Ver Producto' : 'Agotado'}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
