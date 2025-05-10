const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosController');

// Obtener productos
router.get('/', productosController.getProductos);

// Ruta para obtener el stock de los productos
router.get('/stock', productosController.getStockProductos);  // Corregir ruta aquí

// Crear producto
router.post('/', productosController.createProducto);

// Eliminar producto
router.delete('/:id', productosController.deleteProducto); // Eliminar

// Actualizar producto
router.put('/:id', productosController.updateProducto);    // Actualizar

module.exports = router;
