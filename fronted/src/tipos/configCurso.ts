import {type InfoCurso} from "./cursos";

export const configCurso: Record<string, InfoCurso> = {
    "Infantil": {
        precio: "25€/mes",
        color: "#2563eb",
        bgPrecio: "#6894f5",
        rangoTexto: "(4 a 6 años)",
        minEdad: 4,
        maxEdad: 6
    },
    "Niños": {
        precio: "30€/mes",
        color: "#16a34a",
        bgPrecio: "#4ade80",
        rangoTexto: "(7 a 9 años)",
        minEdad: 7,
        maxEdad: 9
    },
    "Prejuvenil": {
        precio: "35€/mes",
        color: "#f97316",
        bgPrecio: "#fdba74",
        rangoTexto: "(10 a 13 años)",
        minEdad: 10,
        maxEdad: 13
    },
    "Adultos": {
        precio: "40€/mes",
        color: "#db2777",
        bgPrecio: "#f472b6",
        rangoTexto: "(14 años en adelante)",
        minEdad: 14,
        maxEdad: 100
    },
    "Competición": {
        precio: "15€/mes",
        color: "#9333ea",
        bgPrecio: "#c084fc",
        rangoTexto: "(Solo para alumnos de Adultos y Prejuvenil, con autorización del sensei)",
        minEdad: 10,
        maxEdad: 100
    },
    "Preparación Física": {
        precio: "10€/mes",
        color: "#854d0e",
        bgPrecio: "#8b6130",
        rangoTexto: "(Solo para alumnos de Adultos y Prejuvenil, con autorización del sensei)",
        minEdad: 10,
        maxEdad: 100
    }
}
