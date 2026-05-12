const express = require('express');
const router  = express.Router();
const pool    = require('../config/db');

// GET /api/pagos/:id_usuario — pagos del usuario con su método de pago
router.get('/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  try {
    const usuario = await pool.query(
      `SELECT metodo_pago FROM usuario WHERE id_usuario = $1`,
      [id_usuario]
    );

    const pagos = await pool.query(
      `SELECT id_pago, concepto, importe, fecha, estado, metodo_pago
       FROM pago
       WHERE id_usuario = $1
       ORDER BY fecha DESC`,
      [id_usuario]
    );

    res.json({
      metodo_pago: usuario.rows[0]?.metodo_pago || 'Metálico',
      pagos: pagos.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener los pagos" });
  }
});

// POST /api/pagos/pagar/:id_pago — simular pago
router.post('/pagar/:id_pago', async (req, res) => {
  const { id_pago } = req.params;
  try {
    await pool.query(
      `UPDATE pago SET estado = 'Pagado', fecha = CURRENT_DATE WHERE id_pago = $1`,
      [id_pago]
    );
    res.json({ mensaje: "Pago realizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar el pago" });
  }
});

// PUT /api/pagos/facturacion/:id_usuario — actualizar datos de facturación
router.put('/facturacion/:id_usuario', async (req, res) => {
  const { id_usuario } = req.params;
  const { nombre, apellido, dni, direccion, ciudad, codigo_postal, pais, email } = req.body;
  try {
    await pool.query(
      `UPDATE usuario SET nombre=$1, apellido=$2, email=$3 WHERE id_usuario=$4`,
      [nombre, apellido, email, id_usuario]
    );
    res.json({ mensaje: "Datos actualizados correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar los datos" });
  }
});

module.exports = router;