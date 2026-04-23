import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { detallesNoticias } from '../../../tipos/noticiasDetalle';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import '../../../style/Invitado/Noticias/PaginaNoticiaDetalle.css'; // Si quieres añadir estilos específicos

const PaginaNoticiaDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Recuperamos la noticia básica que enviamos desde la Card (vía Link state)
  const noticiaDB = location.state?.noticia;

  // 2. Buscamos el contenido extendido en tu archivo local usando el 'enlace' como clave
  const contenidoExtra = noticiaDB ? detallesNoticias[noticiaDB.enlace] : null;

  useEffect(() => {
    // Al cargar, subimos al inicio de la página
    window.scrollTo(0, 0);
    
    // Si alguien intenta acceder a la URL directamente sin pasar por la lista,
    // o si la noticia no existe en nuestro diccionario, redirigimos a noticias.
    if (!noticiaDB || !contenidoExtra) {
      navigate('/noticias');
    }
  }, [noticiaDB, contenidoExtra, navigate]);

  if (!noticiaDB || !contenidoExtra) return null;

  return (
    <div className="noticia-detalle-container" style={{ width: '100%', margin: '0', padding: '40px 20px' }}>
      {/* Botón Volver */}
      <button 
        onClick={() => navigate(-1)} 
        style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', border: 'none', 
          background: 'none', cursor: 'pointer', color: '#666', marginBottom: '30px',
          fontSize: '1rem', fontWeight: '500'
        }}
      >
        <ChevronLeft size={20} /> Volver a Noticias
      </button>

      <article>
        <header style={{ marginBottom: '30px' }}>
          {/* Categoría y Fecha */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px', color: '#d4af37', fontWeight: '600', fontSize: '0.9rem', textTransform: 'uppercase' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Tag size={16} /> {noticiaDB.categoria}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#888' }}>
              <Calendar size={16} /> {new Date(noticiaDB.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 style={{ fontSize: '3.5rem', lineHeight: '1.1', color: '#1a1a1a', marginBottom: '20px', fontWeight: '800' }}>
            {noticiaDB.titulo}
          </h1>
        </header>

        {/* Imagen cargada desde noticiasDetalle.ts */}
        <div style={{ width: '100%', borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
          <img 
            src={contenidoExtra.imagen} 
            alt={noticiaDB.titulo} 
            style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '600px', objectFit: 'cover' }} 
          />
        </div>

        {/* Contenido Extendido (Texto Largo) */}
        <div 
          className="noticia-cuerpo-texto" 
          style={{ 
            fontSize: '1.25rem', lineHeight: '1.9', color: '#333', 
            textAlign: 'justify', whiteSpace: 'pre-line', fontFamily: 'serif' 
          }}
        >
          {contenidoExtra.textoLargo}
        </div>

        {/* Footer de la noticia */}
        <footer style={{ marginTop: '50px', paddingTop: '30px', borderTop: '1px solid #eee', color: '#999', fontStyle: 'italic' }}>
          <p>Escuela de Karate Katashi - Disciplina y Superación</p>
        </footer>
      </article>
    </div>
  );
};

export default PaginaNoticiaDetalle;