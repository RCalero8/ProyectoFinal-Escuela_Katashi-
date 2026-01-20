-- ==============================
-- 1. TABLAS INDEPENDIENTES
-- ==============================

CREATE TABLE USUARIO (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(20) NOT NULL,
    CONSTRAINT chk_tipo_usuario 
        CHECK (tipo_usuario IN ('ADMINISTRADOR', 'CLIENTE'))
) ENGINE=InnoDB;


CREATE TABLE CURSO (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    f_inicio DATE,
    f_fin DATE,
    precio DECIMAL(10,2)
) ENGINE=InnoDB;


CREATE TABLE MATERIAL (
    id_material INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2),
    stock INT DEFAULT 0
) ENGINE=InnoDB;

-- ==============================
-- 2. TABLAS DEPENDIENTES
-- ==============================

CREATE TABLE ALUMNO (
    id_alumno INT AUTO_INCREMENT PRIMARY KEY,
    dni VARCHAR(20) UNIQUE,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    f_nacimiento DATE NOT NULL,
    nivel VARCHAR(50),
    id_usuario INT NOT NULL,
    CONSTRAINT fk_alumno_usuario 
        FOREIGN KEY (id_usuario) 
        REFERENCES USUARIO(id_usuario)
        ON DELETE CASCADE
) ENGINE=InnoDB;


CREATE TABLE CLASE (
    id_clase INT AUTO_INCREMENT PRIMARY KEY,
    grado VARCHAR(50),
    duracion_min INT,
    id_curso INT,
    CONSTRAINT fk_clase_curso 
        FOREIGN KEY (id_curso) 
        REFERENCES CURSO(id_curso)
) ENGINE=InnoDB;

CREATE TABLE INSCRIPCION (
    codigo INT AUTO_INCREMENT PRIMARY KEY,
    f_inscripcion DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(50),
    id_usuario INT NOT NULL,
    id_curso INT NOT NULL,
    id_alumno INT NOT NULL,
    CONSTRAINT fk_ins_usuario 
        FOREIGN KEY (id_usuario) 
        REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_ins_curso   
        FOREIGN KEY (id_curso)   
        REFERENCES CURSO(id_curso),
    CONSTRAINT fk_ins_alumno  
        FOREIGN KEY (id_alumno)  
        REFERENCES ALUMNO(id_alumno)
) ENGINE=InnoDB;


CREATE TABLE FEDERACION (
    n_licencia VARCHAR(50) PRIMARY KEY,
    categoria VARCHAR(50),
    f_alta DATE,
    f_renovacion DATE,
    resultados_competic TEXT,
    documentos TEXT,
    observaciones TEXT,
    id_alumno INT UNIQUE,
    CONSTRAINT fk_fed_alumno 
        FOREIGN KEY (id_alumno) 
        REFERENCES ALUMNO(id_alumno)
) ENGINE=InnoDB;


CREATE TABLE PAGOS (
    id_pago INT AUTO_INCREMENT PRIMARY KEY,
    f_pago DATETIME DEFAULT CURRENT_TIMESTAMP,
    tipo VARCHAR(50),
    precio DECIMAL(10,2),
    estado VARCHAR(50),
    id_usuario INT NOT NULL,
    id_material INT,
    CONSTRAINT fk_pago_usuario  
        FOREIGN KEY (id_usuario)  
        REFERENCES USUARIO(id_usuario),
    CONSTRAINT fk_pago_material 
        FOREIGN KEY (id_material) 
        REFERENCES MATERIAL(id_material)
) ENGINE=InnoDB;