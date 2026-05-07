import React, { useEffect, useState } from 'react';
import '../../../style/Usuario/Inicio/LatestNews.css';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  contenido?: string;
  enlace?: string;
  categoria?: string;
  imagen_url?: string;
}

const LatestNews: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          'https://proyectofinal-escuela-katashi.onrender.com/api/noticias?limite=2'
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Datos recibidos del API:', data);

        // Validar y procesar los datos
        let noticiasArray: Noticia[] = [];

        if (Array.isArray(data)) {
          noticiasArray = data;
        } else if (data && typeof data === 'object' && Array.isArray(data.noticias)) {
          noticiasArray = data.noticias;
        } else if (data && typeof data === 'object') {
          // Si es un objeto pero no tiene array de noticias, intentar extraer
          noticiasArray = [];
        }

        // Validar que cada noticia tenga los campos necesarios
        const noticiasValidas = noticiasArray.filter(
          (noticia) => noticia && typeof noticia === 'object' && noticia.id && noticia.titulo
        );

        console.log('Noticias válidas después de filtrado:', noticiasValidas);

        if (noticiasValidas.length === 0) {
          setError('No se encontraron noticias para mostrar.');
          setNoticias([]);
        } else {
          setNoticias(noticiasValidas);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error('Error fetching latest news:', errorMessage);
        setError(`Error al cargar las últimas noticias: ${errorMessage}`);
        setNoticias([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  // Estado de carga
  if (loading) {
    return (
      <div className="latest-news-container">
        <p className="loading-text">Cargando últimas noticias...</p>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="latest-news-container">
        <p className="error-text">{error}</p>
      </div>
    );
  }

  // Si no hay noticias
  if (!noticias || noticias.length === 0) {
    return (
      <div className="latest-news-container">
        <p className="no-news-text">No hay noticias disponibles en este momento.</p>
      </div>
    );
  }

  // Renderizar las noticias
  return (
    <div className="latest-news-section">
      <h2 className="latest-news-title">
        📰 Últimas noticias del dojo
      </h2>
      <div className="latest-news-grid">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="news-card">
            {noticia.imagen_url && (
              <img
                src={noticia.imagen_url}
                alt={noticia.titulo}
                className="news-card-image"
                onError={(e) => {
                  // Si la imagen falla, mostrar un placeholder
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200"%3E%3Crect fill="%23ddd" width="400" height="200"/%3E%3Ctext x="50%" y="50%" text-anchor="middle" dy=".3em" fill="%23999" font-size="18"%3EImagen no disponible%3C/text%3E%3C/svg%3E';
                }}
              />
            )}
            <div className="news-card-content">
              <h3 className="news-card-title">{noticia.titulo}</h3>
              <button
                className="read-more-button"
                onClick={() => {
                  // Navegar a la noticia específica
                  const enlace = noticia.enlace || `/noticias/${noticia.id}`;
                  window.location.href = enlace;
                }}
              >
                Leer Mas
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="view-all-button"
        onClick={() => {
          window.location.href = '/noticias';
        }}
      >
        Ver Mas
      </button>
    </div>
  );
};

export default LatestNews;
