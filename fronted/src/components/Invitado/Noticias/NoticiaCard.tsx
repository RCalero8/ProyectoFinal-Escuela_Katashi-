import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import type { Noticia } from '../../../tipos/noticias';
import './NoticiaCard.css';

const categoriaColores: Record<string, { bg: string; text: string }> = {
  'Torneos': { bg: '#F59E0B', text: '#FFFFFF' },
  'Comunicados': { bg: '#06B6D4', text: '#FFFFFF' },
  'Eventos': { bg: '#10B981', text: '#FFFFFF' },
  'Horarios': { bg: '#EAB308', text: '#000000' },
  'Promociones': { bg: '#EC4899', text: '#FFFFFF' },
  'General': { bg: '#6B7280', text: '#FFFFFF' },
};

const imagenesPorCategoria: Record<string, string> = {
  'Torneos': 'https://images.unsplash.com/photo-1555597673-b21d5c3c8e4b?w=400&h=300&fit=crop',
  'Comunicados': 'https://images.unsplash.com/photo-1509563268479-0f004cf3f58b?w=400&h=300&fit=crop',
  'Eventos': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
  'Horarios': 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
  'Promociones': 'https://images.unsplash.com/photo-1555597673-b21d5c935e4e?w=400&h=300&fit=crop',
  'General': 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?w=400&h=300&fit=crop',
};

const formatearFecha = (fecha: string): string => {
  const date = new Date(fecha);
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
};

const NoticiaCard: React.FC<{ noticia: Noticia }> = ({ noticia }) => {
  const categoria = noticia.categoria || 'General';
  const colores = categoriaColores[categoria] || categoriaColores['General'];
  const imagen = imagenesPorCategoria[categoria] || imagenesPorCategoria['General'];

  return (
    <article className="noticia-card">
      <div className="noticia-card__imagen-container">
        <img src={imagen} alt={noticia.titulo} className="noticia-card__imagen" />
        <span className="noticia-card__categoria" style={{ backgroundColor: colores.bg, color: colores.text }}>
          {categoria}
        </span>
      </div>
      <div className="noticia-card__contenido">
        <h3 className="noticia-card__titulo">{noticia.titulo}</h3>
        <div className="noticia-card__fecha">
          <Calendar size={14} />
          <span>{formatearFecha(noticia.fecha)}</span>
        </div>
        <Link to={`/noticia/${noticia.id}`} className="noticia-card__link">
          Leer más <ArrowRight size={16} />
        </Link>
      </div>
    </article>
  );
};

export default NoticiaCard;