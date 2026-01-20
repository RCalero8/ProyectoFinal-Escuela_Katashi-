//Usuarios
INSERT INTO USUARIO (nombre, apellido, email, contrasena, tipo_usuario)
value ('Roberto', 'Diaz', 'roberto@email.com', '1234', 'CLIENTE');
INSERT INTO USUARIO (nombre, apellido, email, contrasena, tipo_usuario)
value ('Sensei', 'Fran', 'admin@dojo.com', 'admin_secure', 'ADMINISTRADOR');

//Alumnos
INSERT INTO ALUMNO (dni, nombre, apellido, f_nacimiento, nivel, id_usuario)
value('12345678Z','Roberto','Diaz','1973-05-20','Blanco','1');
INSERT INTO ALUMNO (dni, nombre, apellido, f_nacimiento, nivel, id_usuario)
value('65004204V','Daniel','Diaz','2015-05-15','Blanco-Amarillo','1');

//Cursos
INSERT INTO CURSO (nombre, descripcion, f_inicio, f_fin, precio) VALUES
('Infantil', 'Introducción al Karate mediante juegos, coordinación y disciplina inicial.','2025-09-18','2026-02-12','25'),
('Niños', 'Mejora técnica, fuerza y disciplina con ejercicios adaptados.','2025-09-18','2026-02-12','30'),
('Prejuvenil', 'Entrenamiento técnico, trabajo físico y primeras nociones de combate.','2025-09-18','2026-02-12','35'),
('Adultos', 'Trabajo físico, técnica avanzada y defensa personal.','2025-09-18','2026-02-12','40'),
('Cpmpetición', 'Entrenamiento intensivo para alumnos federados orientado a campeonatos.','2025-09-18','2026-02-12','15'),
('Preparación Física', 'Mejora de fuerza, agilidad y resistencia para complementar el karate.','2025-09-18','2026-02-12','10');

//Clases
INSERT INTO CLASE (grado, duracion_min, id_curso) VALUES 
('4-6 años', 60, 1), 
('7-9 años', 60, 2), 
('10-13 años', 60, 3),   
('+13 años', 60, 4),         
('Solo los alumnos que el sensei diga', 90, 5),          
('Solo los alumnos que el sensei diga', 60, 6); 

//Federación
INSERT INTO FEDERACION (n_licencia, categoria, f_alta, f_renovacion, id_alumno) VALUES 
('FED-2024-001', 'Senior', '2025-01-15', '2026-01-15', 1),
('FED-2024-002', 'Infantil', '2025-01-20', '2026-01-20', 2);

//Inscripción
INSERT INTO INSCRIPCION (f_inscripcion, estado, id_alumno, id_curso, id_usuario) VALUES 
-- Matrícula del padre (Alumno 1) - Usuario 1 es el titular
(CURRENT_TIMESTAMP, 'ACTIVA', 1, 4, 1), 
(CURRENT_TIMESTAMP, 'ACTIVA', 1, 6, 1), 
-- Matrícula del hijo (Alumno 2) - Usuario 1 es su padre/tutor
(CURRENT_TIMESTAMP, 'ACTIVA', 2, 1, 1);

//Material
INSERT INTO MATERIAL (nombre, descripcion, precio, stock) VALUES 
('Karategi Entrenamiento', 'Uniforme de algodón resistente, ideal para principiantes. Incluye cinturón blanco.', 39.95, 20),
('Karategi Kumite Profesional', 'Tejido ultra ligero con tecnología de secado rápido. Corte de competición.', 89.00, 10),
('Guantillas Oficiales', 'Protecciones homologadas para combate, disponibles en rojo y azul.', 25.50, 30),
('Espinilleras con Patuco', 'Set completo de protección para tibia y empeine con ajuste de velcro.', 32.00, 15),
('Cinturón de Color', 'Cinturones de algodón 100% disponibles en todos los colores de grado.', 9.00, 50),
('Saco de Pared (Makiwara)', 'Accesorio tradicional para el entrenamiento de precisión y endurecimiento.', 45.00, 5);

//Pagos
INSERT INTO PAGOS (f_pago, tipo, precio, estado, id_usuario, id_material) 
VALUES (CURRENT_TIMESTAMP, 'CUOTA', 70.00, 'COMPLETADO', 1, NULL);

-- Caso 2: El padre compra un Karategi (id_material = 1)
INSERT INTO PAGOS (f_pago, tipo, precio, estado, id_usuario, id_material) 
VALUES (CURRENT_TIMESTAMP, 'MATERIAL', 39.95, 'COMPLETADO', 1, 1);

-- Caso 3: El padre compra protecciones pero el pago está pendiente (id_material = 3)
INSERT INTO PAGOS (f_pago, tipo, precio, estado, id_usuario, id_material) 
VALUES (CURRENT_TIMESTAMP, 'MATERIAL', 25.50, 'PENDIENTE', 1, 3);