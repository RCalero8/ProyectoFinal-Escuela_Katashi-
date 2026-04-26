const express = requiere ('express');
const router = express.Router();
const pool = requiere('../config/db');

//Post /api/registro
router.post('/', async (req, res) => {
    const {nombre, apellido, email, password} = req.body;
    if (!nombre || !apellido || !email || !password){
        return res.status(400).json({error: "Todos los campos son obligatorios"})
    }
    try {
        //1. Comprobar si el email ya esta registrado
        const emailExiste = await pool.query(
            `SELECT id_usuario FROM usuario WHERE email = $1`,
            [email]
        );
        if (emailExiste.rows.length > 0){
            return res.status(409).json({error: "Este email ya está registrado"});
        }
        //2. Buscar si existe como alumno en la escuela
         const alumno = await pool.query(
            `SELECT id_alumno FROM alumno
            WHERE LOWER(nombre) = LOWER($1) AND LOWER(apellido) = LOWER ($2)`,
            [nombre, apellido]
         );
         if (alumno.rows.length === 0){
            return res.status(404).json({ error: "No encontrado" }); 
         }
        //3. Crear el usuario
        const nuevoUsuario = await pool.query(
            `Insert into usuario (nombre, apellido, email, tipo_usuario)
            values ($1, $2, $3, $4, 'CLIENTE')
            returning id_usuario, nombre, apellido, email, tipo_usuario`,
            [nombre, apellido, email, password]
        );

        const usuario = nuevoUsuario.rows[0];
        //4. Vincular el alumno con el nuevo usuario
        await pool.query(
            `Update alumno set id_usuario = $1
            where id_alumno = $2`,
            [usuario.id_usuario, alumno.rows[0].id_alumno]
        );
        //5. Devolver el usuario para loguearlo directamente
        res.status(201).json({
            id_usuario:   usuario.id_usuario,
            nombre:       usuario.nombre,
            apellido:     usuario.apellido,
            email:        usuario.email,
            tipo_usuario: usuario.tipo_usuario,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Error interno del servidor"});
    }

});

module.exports = router;
