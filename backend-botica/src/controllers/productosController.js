const db = require('../config/db');

// Obtener todos los productos
exports.getProductos = (req, res) => {
    db.query('SELECT * FROM productos', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

// Actualizar un producto
exports.updateProducto = (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    const query = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, stock = ? WHERE id = ?';
    db.query(query, [nombre, descripcion, precio, categoria, stock, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto actualizado exitosamente' });
    });
};

// Crear un nuevo producto
exports.createProducto = (req, res) => {
    const { nombre, descripcion, precio, categoria, stock } = req.body;
    const query = 'INSERT INTO productos (nombre, descripcion, precio, categoria, stock) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, categoria, stock], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ message: 'Producto creado exitosamente', id: results.insertId });
    });
};

// Eliminar un producto

exports.deleteProducto = (req, res) => {
    const { id } = req.params;
    console.log(`Intentando eliminar el producto con id: ${id}`); // Log para verificar el id
    const query = 'DELETE FROM productos WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto:', err.message);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            console.log('Producto no encontrado');
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        console.log('Producto eliminado exitosamente');
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    });
};

// Obtener stock de los productos
exports.getStockProductos = (req, res) => {
    const query = 'SELECT nombre, stock FROM productos';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);  // Devolvemos el nombre y stock de los productos
    });
};