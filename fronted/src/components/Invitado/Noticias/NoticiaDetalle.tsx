import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { detallesNoticias } from '../../../tipos/noticiasDetalle';
import { Calendar, Tag, ChevronLeft } from 'lucide-react';
import { Header } from '../../Header/Header';
import HeaderUsuario from '../../Header/usuario/Header';
import '../../../style/Invitado/Noticias/PaginaNoticiaDetalle.css';

const PaginaNoticiaDetalle: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isUsuario, setIsUsuario] = useState(false);
  
  // 1. Recuperamos la noticia básica que enviamos desde la Card (vía Link state)
  const noticiaDB = location.state?.noticia;

  // 2. Buscamos el contenido extendido en tu archivo local usando el 'enlace' como clave
  const contenidoExtra = noticiaDB ? detallesNoticias[noticiaDB.enlace] : null;

  useEffect(() => {
    // Al cargar, subimos al inicio de la página
    window.scrollTo(0, 0);
    
    // Detectamos si hay un usuario logueado
    const usuarioLS = localStorage.getItem("usuario");
    setIsUsuario(!!usuarioLS);
    
    // Si alguien intenta acceder a la URL directamente sin pasar por la lista,
    // o si la noticia no existe en nuestro diccionario, redirigimos a noticias.
    if (!noticiaDB || !contenidoExtra) {
      navigate(usuarioLS ? '/usuario/noticias' : '/noticias');
    }
  }, [noticiaDB, contenidoExtra, navigate]);

  if (!noticiaDB || !contenidoExtra) return null;

  return (
    <>
      {isUsuario ? <HeaderUsuario /> : <Header />}
      <div className="noticia-detalle-container">
        <div className="noticia-detalle-inner">
          {/* Botón Volver */}
          <button onClick={() => navigate(-1)} className="btn-volver">
            <ChevronLeft size={20} /> Volver a Noticias
          </button>

          <article>
            <header className="noticia-detalle-header">
              {/* Categoría y Fecha */}
              <div className="noticia-detalle-meta">
                <span className="meta-item categoria">
                  <Tag size={16} /> {noticiaDB.categoria}
                </span>
                <span className="meta-item fecha">
                  <Calendar size={16} /> {new Date(noticiaDB.fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>

              <h1 className="noticia-detalle-titulo">
                {noticiaDB.titulo}
              </h1>
            </header>

            {/* Imagen cargada desde noticiasDetalle.ts */}
            <div className="noticia-detalle-imagen-wrap">
              <img 
                src={contenidoExtra.imagen} 
                alt={noticiaDB.titulo} 
                className="noticia-detalle-img"
              />
            </div>

            {/* Contenido Extendido (Texto Largo) */}
            <div className="noticia-detalle-cuerpo">
              {contenidoExtra.textoLargo}
            </div>

            {/* Footer de la noticia */}
            <footer className="noticia-detalle-footer">
              <p>Escuela de Karate Katashi - Disciplina y Superación</p>
            </footer>
          </article>
        </div>
      </div>
    </>
  );
};

export default PaginaNoticiaDetalle;