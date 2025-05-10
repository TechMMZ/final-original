const express = require('express');
const router = express.Router();
const clientesController = require('../controllers/clientesController');

// Obtener todos los clientes
router.get('/', clientesController.obtenerClientes);

// Obtener un cliente por ID
router.get('/:id', clientesController.obtenerClientePorId);

// Agregar un nuevo cliente
router.post('/', clientesController.agregarCliente);

// Actualizar un cliente existente
router.put('/:id', clientesController.actualizarCliente);

// Eliminar un cliente
router.delete('/:id', clientesController.eliminarCliente);

module.exports = router;
