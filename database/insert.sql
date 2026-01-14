//Insertar cursos
insert into curso (nombre,descripcion,f_inicio,f_fin,precio)
values ('Programa Infantil', 'Clases del curso 2025-26 de infantil (4-6)', TO_DATE('2025-09-01', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'),25.00);
insert into curso (nombre,descripcion,f_inicio,f_fin,precio)
values ('Programa Niños', 'Clases del curso 2025-26 de Niños(7-9)', TO_DATE('2025-09-01', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'),30.00);
insert into curso (nombre,descripcion,f_inicio,f_fin,precio)
values ('Programa Prejuvenil', 'Clases del curso 2025-26 de Prejuvenil(10-13)', TO_DATE('2025-09-01', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'),35.00);
insert into curso (nombre,descripcion,f_inicio,f_fin,precio)
values ('Programa Adultos', 'Clases del curso 2025-26 de Adultos(+13)', TO_DATE('2025-09-01', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'),40.00);
insert into curso (nombre,descripcion,f_inicio,f_fin,precio)
values ('Programa Competicion', 'Clases del curso 2025-26 de Competicion', TO_DATE('2025-09-01', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'),15.00);
insert into curso (nombre,descripcion,f_inicio,f_fin,precio)
values ('Programa Preparacion Fisica', 'Clases del curso 2025-26 de Preparacion Fisica', TO_DATE('2025-09-01', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'),10.00);
//Clases
Insert into clase (grado,duracion_min,id_curso)
values('Infantil',60,1);
Insert into clase (grado,duracion_min,id_curso)
values('Niños',60,2);
Insert into clase (grado,duracion_min,id_curso)
values('Prejuvenil',60,3);
Insert into clase (grado,duracion_min,id_curso)
values('Adultos',60,4);
Insert into clase (grado,duracion_min,id_curso)
values('Competicion',90,5);
Insert into clase (grado,duracion_min,id_curso)
values('Preparación Física',30,6);