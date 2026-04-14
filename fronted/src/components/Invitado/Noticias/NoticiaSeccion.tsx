import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import NoticiaCard from './NoticiaCard';
import type { Noticia } from '../../../tipos/noticias';
import '../../../style/Invitado/Noticias/NoticiaSeccion.css';

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

const NoticiasSection: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [categorias, setCategorias] = useState<string[]>([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Categorias');
  const [orden, setOrden] = useState('Mas Reciente');
  const [paginaActual, setPaginaActual] = useState(1);
  const [cargando, setCargando] = useState(true);
  const porPagina = 6;

  useEffect(() => {
    fetch(`${API_URL}/api/noticias/categorias`)
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    setCargando(true);
    const params = new URLSearchParams();
    if (categoriaSeleccionada !== 'Categorias') params.append('categoria', categoriaSeleccionada);
    params.append('orden', orden);
    params.append('limite', '100');

    fetch(`${API_URL}/api/noticias?${params}`)
      .then(res => res.json())
      .then(data => { setNoticias(data); setPaginaActual(1); })
      .catch(console.error)
      .finally(() => setCargando(false));
  }, [categoriaSeleccionada, orden]);

  const totalPaginas = Math.ceil(noticias.length / porPagina);
  const noticiasPaginadas = noticias.slice((paginaActual - 1) * porPagina, paginaActual * porPagina);

  return (
    <section className="noticias-section">
      <div className="noticias-filtros">
        <select value={categoriaSeleccionada} onChange={e => setCategoriaSeleccionada(e.target.value)} className="noticias-select">
          <option value="Categorias">Todas las categorías</option>
          {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={orden} onChange={e => setOrden(e.target.value)} className="noticias-select">
          <option value="Mas Reciente">Más reciente</option>
          <option value="Mas Antiguo">Más antiguo</option>
        </select>
      </div>

      {cargando ? (
        <div className="noticias-loading"><div className="spinner"></div></div>
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