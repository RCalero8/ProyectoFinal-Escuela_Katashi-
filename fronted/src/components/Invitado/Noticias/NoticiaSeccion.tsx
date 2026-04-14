import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NoticiaCard from './NoticiaCard';
import Filtros from './Filtros';
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

  // 1. Cargar las categorías al montar
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/noticias/categorias`);
        if (response.ok) {
          const data = await response.json();
          setCategoriesList(data.length > 0 ? data : ['General', 'Eventos', 'Anuncios']);
        }
      } catch (error) {
        setCategoriesList(['General', 'Eventos', 'Anuncios']);
      }
    };
    fetchCategories();
  }, []);

  // 2. Lógica de búsqueda reactiva
  useEffect(() => {
    const fetchNoticias = async () => {
      setCargando(true);
      try {
        const params = new URLSearchParams();
        if (searchTerm) params.append('titulo', searchTerm);
        if (category !== 'Categorias') params.append('categoria', category);
        
        // Ajustamos el orden para la API
        params.append('orden', sortOrder === 'Mas Reciente' ? 'desc' : 'asc');
        params.append('limite', '100');

        const response = await fetch(`${API_URL}/api/noticias?${params}`);
        if (response.ok) {
          const data = await response.json();
          setNoticias(data);
          setPaginaActual(1); // Volver a la pág 1 al filtrar
        }
      } catch (error) {
        console.error('Error cargando noticias:', error);
      } finally {
        setCargando(false);
      }
    };

    const timeoutId = setTimeout(fetchNoticias, 400); // Espera un poco mientras escribes
    return () => clearTimeout(timeoutId);
  }, [searchTerm, category, sortOrder]);

  const totalPaginas = Math.ceil(noticias.length / porPagina);
  const noticiasPaginadas = noticias.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

  return (
    <section className="noticias-section">
      {/* AQUÍ LOS UNIMOS: Pasamos estados y setters como props */}
      <Filtros 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        category={category}
        setCategory={setCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        categoriesList={categoriesList}
        handleSearch={() => {}} // El useEffect ya lo hace automático
      />

      {cargando ? (
        <div className="noticias-loading"><div className="spinner"></div></div>
      ) : noticias.length === 0 ? (
        <div className="noticias-empty">No se encontraron noticias</div>
      ) : (
        <>
          <div className="noticias-grid">
            {noticiasPaginadas.map(noticia => (
              <NoticiaCard key={noticia.id} noticia={noticia} />
            ))}
          </div>

          {totalPaginas > 1 && (
            <nav className="noticias-paginacion">
              <button 
                onClick={() => setPaginaActual(p => Math.max(p - 1, 1))} 
                disabled={paginaActual === 1} 
                className="paginacion-btn"
              >
                <ChevronLeft size={18} /> Anterior
              </button>
              <div className="paginacion-numeros">
                {Array.from({ length: totalPaginas }, (_, i) => (
                  <button 
                    key={i} 
                    onClick={() => setPaginaActual(i + 1)} 
                    className={`paginacion-btn ${paginaActual === i + 1 ? 'activo' : ''}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button 
                onClick={() => setPaginaActual(p => Math.min(p + 1, totalPaginas))} 
                disabled={paginaActual === totalPaginas} 
                className="paginacion-btn"
              >
                Siguiente <ChevronRight size={18} />
              </button>
            </nav>
          )}
        </>
      )}
    </section>
  );
};

export default NoticiasSection;