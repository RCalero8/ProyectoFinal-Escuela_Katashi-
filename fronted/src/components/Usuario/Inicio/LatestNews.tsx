import React, { useEffect, useState } from 'react';
import '../../../style/Usuario/Inicio/LatestNews.css';

interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  contenido: string;
  enlace: string;
  categoria: string;
  imagen_url: string;
}
const LatestNews: React.FC = () => {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        // Fetch only the 2 most recent news items
        const response = await fetch('https://proyectofinal-escuela-katashi.onrender.com/api/noticias?limite=2');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNoticias(data.noticias);
      } catch (err) {
        setError('Error al cargar las últimas noticias.');
        console.error('Error fetching latest news:', err);
        console.error('Detalles del error:', err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) {
    return <div className="latest-news-container">Cargando últimas noticias...</div>;
  }

  if (error) {
    return <div className="latest-news-container error">{error}</div>;
  }

  return (
    <div className="latest-news-section">
      <h2 className="latest-news-title">
        <img src="/path/to/icon.png" alt="Icono de noticias" className="news-title-icon" />
        Últimas noticias del dojo
      </h2>
      <div className="latest-news-grid">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="news-card">
            <img src={noticia.imagen_url} alt={noticia.titulo} className="news-card-image" />
            <div className="news-card-content">
              <h3 className="news-card-title">{noticia.titulo}</h3>
              <button className="read-more-button" onClick={() => window.location.href = `/noticias/${noticia.id}`}>
                Leer Mas
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="view-all-button" onClick={() => window.location.href = '/noticias'}>
        Ver Mas
      </button>
    </div>
  );
};

export default LatestNews;
