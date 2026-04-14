import React, { useState, useEffect } from 'react';
import '../../../style/Invitado/Noticias/Filtros.css';

const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

interface FiltrosProps {
  onFiltrosChange: (filtros: { searchTerm: string; category: string; sortOrder: string }) => void;
}

const Filtros: React.FC<FiltrosProps> = ({ onFiltrosChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Categorias');
  const [sortOrder, setSortOrder] = useState('Mas Reciente');
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

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

  // Emitir cambios al padre
  useEffect(() => {
    onFiltrosChange({ searchTerm, category, sortOrder });
  }, [searchTerm, category, sortOrder, onFiltrosChange]);

  const handleSearch = () => {
    onFiltrosChange({ searchTerm, category, sortOrder });
  };

  return (
    <div className="news-filters-container">
      {/* Campo de Búsqueda */}
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

      {/* Selector de Categorías */}
      <div className="news-filter-group">
        <select 
          className="news-filter-select" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Categorias">Categorias</option>
          {categoriesList.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <div className="news-filter-icon-btn">
          <div className="news-filter-arrow"></div>
        </div>
      </div>

      {/* Selector de Ordenación */}
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
  );
};

export default Filtros;
