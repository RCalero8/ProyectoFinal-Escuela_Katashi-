import React, { useState, useEffect } from 'react';
import '../../../style/Invitado/Noticias/Filtros.css';

// URL de la API proporcionada por el usuario
const API_URL = "https://proyectofinal-escuela-katashi.onrender.com";

/**
 * Componente Filtros
 * 
 * Una barra de búsqueda y filtros para las noticias del dojo.
 * Se conecta dinámicamente con la API en Render.
 */
const Filtros: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('Categorias');
  const [sortOrder, setSortOrder] = useState('Mas Reciente');
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  // Cargar categorías dinámicamente al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log(`Solicitando categorías a: ${API_URL}/api/noticias/categorias`);
        const response = await fetch(`${API_URL}/api/noticias/categorias`);
        if (response.ok) {
          const data = await response.json();
          console.log('Categorías recibidas:', data);
          setCategoriesList(data.length > 0 ? data : ['General', 'Eventos', 'Anuncios']);
        } else {
          console.error('Error en la respuesta del servidor al cargar categorías');
          // Fallback con categorías por defecto si el servidor devuelve error
          setCategoriesList(['General', 'Eventos', 'Anuncios']);
        }
      } catch (error) {
        console.error('Error de red al cargar categorías:', error);
        // Fallback con categorías por defecto si hay error de red
        setCategoriesList(['General', 'Eventos', 'Anuncios']);
      }
    };

    fetchCategories();
  }, []);

  // Función para manejar la búsqueda y filtros
  const handleSearch = () => {
    console.log('Ejecutando búsqueda con:', { searchTerm, category, sortOrder });
    // Ejemplo de llamada a la API con los parámetros:
    // const url = `${API_URL}/api/noticias?titulo=${searchTerm}&categoria=${category}&orden=${sortOrder}`;
    // fetch(url)...
  };

  // Efecto para disparar la búsqueda cuando cambian los filtros
  useEffect(() => {
    handleSearch();
  }, [category, sortOrder]);

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

      {/* Selector de Categorías Dinámico */}
      <div className="news-filter-group">
        <select 
          className="news-filter-select" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Categorias">Categorias</option>
          {categoriesList.length > 0 ? (
            categoriesList.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))
          ) : (
            <option disabled>Cargando categorías...</option>
          )}
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
