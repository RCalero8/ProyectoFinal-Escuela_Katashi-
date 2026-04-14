import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NoticiaCard from './NoticiaCard';
import type { Noticia } from '../../../tipos/noticias';
import '../../../style/Invitado/Noticias/NoticiaSeccion.css';
import '../../../style/Invitado/Noticias/Filtros.css';

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const NoticiasSection: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Categorias');
  const [sortOrder, setSortOrder] = useState('Mas Reciente');
  const [categoriesList, setCategoriesList] = useState<string[]>([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const porPagina = 6;

  // Cargar categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/noticias/categorias`);
        if (response.ok) {
          const data = await response.json();
          setCategoriesList(data.length > 0 ? data : ['General', 'Eventos', 'Anuncios']);
        } else {
          setCategoriesList(['General', 'Eventos', 'Anuncios']);
        }
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        setCategoriesList(['General', 'Eventos', 'Anuncios']);
      }
    };

    fetchCategories();
  }, []);

  // Cargar noticias cuando cambian los filtros
  useEffect(() => {
    const fetchNoticias = async () => {
      setCargando(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('titulo', searchTerm);
        if (category !== 'Categorias') params.append('categoria', category);
        params.append('orden', sortOrder);
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
  }, [searchTerm, category, sortOrder]);

  const totalPaginas = Math.ceil(noticias.length / porPagina);
  const noticiasPaginadas = noticias.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

  const handleSearch = () => {
    console.log('Filtros actualizados:', { searchTerm, category, sortOrder });
  };

  return (
    <section className="noticias-section">
      {/* Filtros integrados directamente */}
      <div className="news-filters-container">
        <div className="news-filter-group">
          <input 
            type="text" 
            className="news-filter-input" 
            placeholder="Buscar" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="news-filter-icon-btn" onClick={handleSearch} aria-label="Buscar">
            <svg className="news-filter-icon" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            </svg>
          </button>
        </div>

        <div className="news-filter-group">
          <select 
            className="news-filter-select" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Categorias">Categorias</option>
            {categoriesList.length > 0 ? categoriesList.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            )) : (
              <option disabled>Cargando categorías...</option>
            )}
          </select>
          <div className="news-filter-icon-btn">
            <div className="news-filter-arrow"></div>
          </div>
        </div>

        <div className="news-filter-group">
          <select 
            className="news-filter-select" 
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Mas Reciente">Mas Reciente</option>
            <option value="Mas Antiguo">Mas Antiguo</option>
          </select>
          <div className="news-filter-icon-btn">
            <div className="news-filter-arrow"></div>
          </div>
        </div>
      </div>

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
          <button onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} disabled={paginaActual === 1} className="paginacion-btn">
            <ChevronLeft size={18} /> Anterior
          </button>
          <div className="paginacion-numeros">
            {Array.from({ length: totalPaginas }, (_, i) => (
              <button key={i} onClick={() => setPaginaActual(i + 1)} className={`paginacion-btn ${paginaActual === i + 1 ? 'activo' : ''}`}>
                {i + 1}
              </button>
            ))}
          </div>
          <button onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} disabled={paginaActual === totalPaginas} className="paginacion-btn">
            Siguiente <ChevronRight size={18} />
          </button>
        </nav>
      )}
    </section>
  );
};

export default NoticiasSection;
