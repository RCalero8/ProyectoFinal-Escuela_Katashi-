import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Noticia } from '../../../tipos/noticias';
// Importamos el diccionario de detalles donde están las imágenes reales
import { detallesNoticias } from '../../../tipos/noticiasDetalle';
import '../../../style/Invitado/Noticias/NoticiaCard.css';

const categoriaColores: Record<string, { bg: string; text: string }> = {
  'Torneos': { bg: '#F59E0B', text: '#FFFFFF' },
  'Comunicados': { bg: '#06B6D4', text: '#FFFFFF' },
  'Eventos': { bg: '#10B981', text: '#FFFFFF' },
  'Horarios': { bg: '#EAB308', text: '#000000' },
  'Promociones': { bg: '#EC4899', text: '#FFFFFF' },
  'General': { bg: '#6B7280', text: '#FFFFFF' },
};

const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

const NoticiaCard: React.FC<{ noticia: Noticia }> = ({ noticia }) => {
  const categoria = noticia.categoria || 'General';
  const colores = categoriaColores[categoria] || categoriaColores['General'];

  // BUSCAMOS LA IMAGEN EN noticiasDetalle.ts usando el enlace como clave
  // Si por alguna razón no existe en el archivo, ponemos una por defecto
  const infoExtra = noticia.enlace ? detallesNoticias[noticia.enlace] : null;
  const imagenReal = infoExtra ? infoExtra.imagen : 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400';

  if (!noticia.enlace) {
    return null; // O manejar de otra forma
  }

  return (
    <article className="noticia-card">
      <div className="noticia-card__imagen-container">
        {/* Usamos la imagen que viene de noticiasDetalle.ts */}
        <img 
          src={imagenReal} 
          alt={noticia.titulo} 
          className="noticia-card__imagen" 
        />
        <span 
          className="noticia-card__categoria" 
          style={{ backgroundColor: colores.bg, color: colores.text }}
        >
          {categoria}
        </span>
      </div>

      <div className="noticia-card__contenido">
        <h3 className="noticia-card__titulo">{noticia.titulo}</h3>
        
        <div className="noticia-card__fecha">
          <Calendar size={14} />
          <span>{formatearFecha(noticia.fecha)}</span>
        </div>

        {/* Navegamos usando el enlace de la DB y pasando la noticia en el state */}
        <Link 
          to={noticia.enlace} 
          state={{ noticia }} 
          className="noticia-card__link"
        >
          Leer más <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default NoticiaCard;