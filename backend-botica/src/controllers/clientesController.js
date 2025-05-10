const db = require('../config/db');

// Obtener todos los clientes
exports.obtenerClientes = (req, res) => {
    const query = 'SELECT id, nombre, email, telefono, direccion FROM clientes';

    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al obtener clientes:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }
        res.status(200).json(resultados);
    });
};

// Obtener un cliente por su ID
exports.obtenerClientePorId = (req, res) => {
    const { id } = req.params;  // Extraer el ID de la URL

    const query = 'SELECT id, nombre, email, telefono, direccion FROM clientes WHERE id = ?';

    db.query(query, [id], (err, resultados) => {
        if (err) {
            console.error('Error al obtener el cliente:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }

        if (resultados.length === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }

        res.status(200).json(resultados[0]);  // Devolver el primer cliente encontrado
    });
};

// Agregar un nuevo cliente
exports.agregarCliente = (req, res) => {
    const { nombre, email, telefono, direccion } = req.body;

    const query = 'INSERT INTO clientes (nombre, email, telefono, direccion) VALUES (?, ?, ?, ?)';

    db.query(query, [nombre, email, telefono, direccion], (err, resultados) => {
        if (err) {
            console.error('Error al agregar cliente:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }
        res.status(201).json({ mensaje: 'Cliente agregado exitosamente', id: resultados.insertId });
    });
};

// Actualizar un cliente existente
exports.actualizarCliente = (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;

    const query = 'UPDATE clientes SET nombre = ?, email = ?, telefono = ? WHERE id = ?';

    db.query(query, [nombre, email, telefono, id], (err, resultados) => {
        if (err) {
            console.error('Error al actualizar cliente:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente actualizado exitosamente' });
    });
};

// Eliminar un cliente
exports.eliminarCliente = (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM clientes WHERE id = ?';

    db.query(query, [id], (err, resultados) => {
        if (err) {
            console.error('Error al eliminar cliente:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }
        if (resultados.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Cliente no encontrado' });
        }
        res.status(200).json({ mensaje: 'Cliente eliminado exitosamente' });
    });
};
