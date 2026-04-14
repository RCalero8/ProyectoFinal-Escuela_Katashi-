import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NoticiaCard from './NoticiaCard';
import Filtros from './Filtros';
import type { Noticia } from '../../../tipos/noticias';
import '../../../style/Invitado/Noticias/NoticiaSeccion.css';

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const NoticiasSection: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [filtros, setFiltros] = useState({ searchTerm: '', category: 'Categorias', sortOrder: 'Mas Reciente' });
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const porPagina = 6;

  const handleFiltrosChange = useCallback((nuevosFiltros: { searchTerm: string; category: string; sortOrder: string }) => {
    setFiltros(nuevosFiltros);
  }, []);

  // Cargar noticias cuando cambian los filtros
  useEffect(() => {
    const fetchNoticias = async () => {
      setCargando(true);
      try {
        const params = new URLSearchParams();
        if (filtros.searchTerm) params.append('titulo', filtros.searchTerm);
        if (filtros.category !== 'Categorias') params.append('categoria', filtros.category);
        params.append('orden', filtros.sortOrder);
        params.append('limite', '100');

        const response = await fetch(`${API_URL}/api/noticias?${params}`);
        if (response.ok) {
          const data = await response.json();
          setNoticias(data);
          setPaginaActual(1);
        }
      } catch (error) {
        console.error('Error al cargar noticias:', error);
      } finally {
        setCargando(false);
      }
    };

    const timeoutId = setTimeout(fetchNoticias, 300);
    return () => clearTimeout(timeoutId);
  }, [filtros]);

  const totalPaginas = Math.ceil(noticias.length / porPagina);
  const noticiasPaginadas = noticias.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

  return (
    <section className="noticias-section">
      <Filtros onFiltrosChange={handleFiltrosChange} />

      {cargando ? (
        <div className="noticias-loading"><div className="spinner"></div></div>
      ) : noticias.length === 0 ? (
        <div className="noticias-empty">No se encontraron noticias</div>
      ) : (
        <div className="noticias-grid">
          {noticiasPaginadas.map(noticia => <NoticiaCard key={noticia.id} noticia={noticia} />)}
        </div>
      )}

      {totalPaginas > 1 && (
        <nav className="noticias-paginacion">
          <button onClick={() => setPaginaActual(p => p - 1)} disabled={paginaActual === 1} className="paginacion-btn">
            <ChevronLeft size={18} /> Anterior
          </button>
          <div className="paginacion-numeros">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button key={i} onClick={() => setPaginaActual(i + 1)} className={`paginacion-btn ${paginaActual === i + 1 ? 'activo' : ''}`}>
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={() => setPaginaActual(p => p + 1)} disabled={paginaActual === totalPaginas} className="paginacion-btn">
            Siguiente <ChevronRight size={18} />
          </button>
        </nav>
      )}
    </section>
  );
};

export default NoticiasSection;