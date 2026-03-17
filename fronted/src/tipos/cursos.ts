export interface Clase {
    id_clase: number;
    grado: string;
    duracion_min: number;
    id_curso: number;
}

export interface Curso {
    id_curso: number;
    nombre: string;
    descripcion: string;
    f_inicio: string;
    f_fin: string;
    clases?: Clase[];   
}