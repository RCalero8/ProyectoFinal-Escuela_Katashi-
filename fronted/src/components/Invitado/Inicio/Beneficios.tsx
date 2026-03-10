import {useState, useEffect} from 'react';
import '../../../style/Invitado/Inicio/Beneficios.css';

interface  Caracteristica {
    icono: keyof typeof iconos;
    titulo: string;
    descripcion: string;
}

interface Estadistica {
    valor: string;
    etiqueta: string;
}

const iconos = {
    trofeo: (
         <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }}>
      <rect x="8" y="4" width="48" height="36" rx="4"
            fill="#cc1111" stroke="#ff3333" strokeWidth="1.5" />
      <path d="M8 16 C2 16 2 32 8 32"
            stroke="#cc1111" strokeWidth="4" fill="none" />
      <path d="M56 16 C62 16 62 32 56 32"
            stroke="#cc1111" strokeWidth="4" fill="none" />
      <rect x="26" y="40" width="12" height="10" fill="#cc1111" />
      <rect x="18" y="50" width="28" height="6" rx="2" fill="#cc1111" />
      <path d="M22 18 L26 28 L32 22 L38 28 L42 18"
            stroke="white" strokeWidth="2.5" fill="none" strokeLinejoin="round" />
    </svg>
    ),
    medalla: (
       <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }}>
      <circle cx="32" cy="38" r="20" fill="#2563eb" stroke="#2563eb" strokeWidth="2" />
      <circle cx="32" cy="38" r="14" fill="#2563eb" />
      <path d="M32 24 L35 33 L45 33 L37 39 L40 48 L32 42 L24 48 L27 39 L19 33 L29 33 Z"
            fill="#1a1a2e" stroke="#1a1a2e" strokeWidth="0.5" />
      <rect x="26" y="4" width="12" height="20" rx="2" fill="#2563eb" />
      <path d="M20 4 L26 4 L26 18 L20 18 Z" fill="#2563eb" />
      <path d="M44 4 L38 4 L38 18 L44 18 Z" fill="#2563eb" />
    </svg>
    ),
    corazon: (
          <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }}>
      <path d="M32 56 C32 56 6 38 6 22 C6 14 12 8 20 8 C25 8 29 11 32 15
               C35 11 39 8 44 8 C52 8 58 14 58 22 C58 38 32 56 32 56Z"
            stroke="#16a34a" strokeWidth="3" fill="none" />
    </svg>
    ),
    grupo: (
         <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
         style={{ width: "100%", height: "100%" }}>
      <circle cx="32" cy="18" r="10" stroke="#f5c518" strokeWidth="3" fill="none" />
      <circle cx="14" cy="24" r="8" stroke="#f5c518" strokeWidth="2.5" fill="none" />
      <circle cx="50" cy="24" r="8" stroke="#f5c518" strokeWidth="2.5" fill="none" />
      <path d="M6 52 C6 42 14 36 24 36 L40 36 C50 36 58 42 58 52"
            stroke="#f5c518" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M2 48 C2 40 8 36 14 36"
            stroke="#f5c518" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M62 48 C62 40 56 36 50 36"
            stroke="#f5c518" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
    )
};

const caracteristicas: Caracteristica[] = [
    {
        icono: "trofeo",
        titulo: "Karate Tradicional",
        descripcion: "Disciplina, técnica y valores del auténtico karate-do."
    },
    {
        icono: "medalla",
        titulo: "Participación en Competiciones",
        descripcion: "Compite a nivel local y provincial con nuestro equipo."
    },
    {
        icono: "corazon",
        titulo: "Desarrollo Físico y Mental",
        descripcion: "Mejora tu condición física y fortalece tu mente."
    },
    {
        icono: "grupo",
        titulo: "Senseis Certificados",
        descripcion: "Instructores con años de experiencia y certificación oficial."
    }
];

const estadisticas: Estadistica [] = [
    {valor: "200+", etiqueta: "Alumnos"},
    {valor: "15+", etiqueta: "Años de experiencia"},
    {valor: "50+", etiqueta: "Competiciones"},
]
export default function Beneficios(){
    return (
        <div className="karate-wrapper">
            <div className="karate-section">
                <h1 className="titulo-main">Que ofrecemos</h1>
                <p className="subtitulo">Más que un deporte, una filosofía de vida</p>
                <div className="caracteristicas-grid">
                    {caracteristicas.map((c) => (
                        <div key={c.titulo} className='caracteristicas-card'>
                            <div className="icono-box">
                                {iconos[c.icono]}
                            </div>
                            <h3 className='caracteristicas-titulo'>{c.titulo}</h3>
                            <p className="caracteristicas-desc">{c.descripcion}</p>
                        </div>
                    ))}
                </div>
                <div className="divider" />
                <div className="porque-section">
                    <h2 className="porque-titulo">¿Por qué elegirnos?</h2>
                    <p className="porque-text">En nuestra escuela, cada alumno es único. Nos enfocamos en el desarrollo integral de la persona, combinando la tradición del karate con métodos de enseñanza modernos y efectivos. Únete a nuestra familia y descubre tu potencial.</p>
                    <div className="estadisticas-row">
                        {estadisticas.map((e) => (
                            <div className="estadistica" key={e.etiqueta}>
                                <span className="estadistica-valor">{e.valor}</span>
                                <span className="estadistica-etiqueta">{e.etiqueta}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}