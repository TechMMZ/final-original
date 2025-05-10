const db = require('../config/db'); // Importamos la conexión de la base de datos

exports.registrarVenta = (req, res) => {
    const usuario_id = 1; // O un valor fijo si no estás usando autenticación
    const { cliente_id, productos } = req.body;

    const productosConStockInsuficiente = [];
    const productIds = productos.map(producto => producto.id);

    // Consulta del stock desde la tabla productos
    const query = 'SELECT id AS producto_id, stock AS cantidad FROM productos WHERE id IN (?)';

    db.query(query, [productIds], (err, resultados) => {
        if (err) {
            console.error('Error al verificar el stock:', err);
            return res.status(500).json({ mensaje: 'Error en el servidor' });
        }

        // Verificar si el stock es suficiente para cada producto
        productos.forEach(producto => {
            const productoDB = resultados.find(p => p.producto_id === producto.id);
            const stockDisponible = productoDB?.cantidad ?? 0;

            if (stockDisponible < producto.cantidad) {
                productosConStockInsuficiente.push(producto);
            }
        });

        if (productosConStockInsuficiente.length > 0) {
            return res.status(400).json({
                mensaje: 'Stock insuficiente para los siguientes productos:',
                productos: productosConStockInsuficiente
            });
        }

        // Calcular el total de la venta
        const total = productos.reduce((acc, producto) => acc + producto.cantidad * producto.precio_unitario, 0);

        // Convertir los productos a un formato de texto o JSON
        const productosString = JSON.stringify(productos); // Convertir a JSON, pero podría ser un string también

        // Registrar la venta en la tabla ventas, incluyendo los productos en formato string
        const ventaQuery = 'INSERT INTO ventas (usuario_id, cliente_id, total, fecha) VALUES (?, ?, ?, NOW())';
        db.query(ventaQuery, [usuario_id, cliente_id, total], (err, resultadoVenta) => {
            if (err) {
                console.error('Error al registrar la venta:', err);
                return res.status(500).json({ mensaje: 'Error en el servidor' });
            }

            const ventaId = resultadoVenta.insertId;

            // Actualizar el stock en la tabla productos
            productos.forEach(producto => {
                const updateStockQuery = 'UPDATE productos SET stock = stock - ? WHERE id = ?';
                db.query(updateStockQuery, [producto.cantidad, producto.id], (err) => {
                    if (err) {
                        console.error(`Error al actualizar el stock del producto ID ${producto.id}:`, err);
                    }
                });
            });

            // Ahora actualizamos la venta con la información de los productos
            const updateProductosQuery = 'UPDATE ventas SET productos = ? WHERE id = ?';
            db.query(updateProductosQuery, [productosString, ventaId], (err) => {
                if (err) {
                    console.error('Error al actualizar los productos de la venta:', err);
                    return res.status(500).json({ mensaje: 'Error en el servidor' });
                }

                res.status(200).json({ mensaje: 'Venta registrada exitosamente' });
            });
        });
    });
};

// Obtener ventas con detalles de productos
exports.getVentas = (req, res) => {
    const query = `
        SELECT v.id, v.fecha, v.total, v.productos, c.nombre AS cliente
        FROM ventas v
        LEFT JOIN clientes c ON v.cliente_id = c.id
    `;

    db.query(query, (err, ventas) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Convertir la cadena JSON de productos a un array de objetos
        const ventasConProductos = ventas.map(venta => {
            return {
                ...venta,
                productos: JSON.parse(venta.productos)
            };
        });

        res.json(ventasConProductos);
    });
};

// Eliminar una venta
exports.eliminarVenta = (req, res) => {
    const { id } = req.params;

    const queryVenta = 'DELETE FROM ventas WHERE id = ?';
    db.query(queryVenta, [id], (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ mensaje: 'Error al eliminar la venta.' });
        }

        // Aquí también se podría actualizar el inventario si se desea
        res.status(200).json({ mensaje: 'Venta eliminada exitosamente.' });
    });
};

// Obtener ventas por día
exports.getVentasPorDia = (req, res) => {
    const query = `
        SELECT DATE(v.fecha) AS fecha, SUM(v.total) AS total_ventas
        FROM ventas v
        GROUP BY DATE(v.fecha)
        ORDER BY fecha;
    `;

    db.query(query, (err, ventas) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        res.json(ventas);
    });
};
