-- ─── Crear la tabla noticias ───────────────────────────────
CREATE TABLE IF NOT EXISTS noticias (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  titulo      VARCHAR(255)  NOT NULL,
  fecha       DATE          NOT NULL,
  contenido   TEXT,
  enlace      VARCHAR(255),
  creado_en   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ─── Insertar las 3 noticias iniciales ──────────────────────
INSERT INTO noticias (titulo, fecha, contenido, enlace) VALUES
(
  'Resultados del torneo provincial de kata',
  '2025-11-15',
  'Nuestros alumnos participaron en el torneo provincial de kata obteniendo excelentes resultados. Estamos muy orgullosos del esfuerzo y dedicación demostrados.',
  '#'
),
(
  'Nuevos horarios para grupos infantiles',
  '2025-11-10',
  'A partir del próximo mes actualizamos los horarios de los grupos infantiles para adaptarnos mejor a las necesidades de las familias. Consulta el nuevo calendario.',
  '#'
),
(
  'Entrenamiento especial este sábado',
  '2025-11-05',
  'Este sábado celebramos una sesión de entrenamiento especial abierta a todos los niveles. Una oportunidad perfecta para practicar y compartir con el resto del dojo.',
  '#'
);
