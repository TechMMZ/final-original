const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

// Crear venta
router.post('/', ventasController.registrarVenta);

// Obtener ventas
router.get('/', ventasController.getVentas);

// Eliminar venta
router.delete('/:id', ventasController.eliminarVenta);

// Obtener ventas por día
router.get('/por-dia', ventasController.getVentasPorDia); // Nueva ruta para obtener ventas por día

module.exports = router;
