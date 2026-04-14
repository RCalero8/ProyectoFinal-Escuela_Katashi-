export interface Noticia {
  id: number;
  titulo: string;
  fecha: string;
  contenido?: string;
  enlace?: string;
  categoria: string;
}