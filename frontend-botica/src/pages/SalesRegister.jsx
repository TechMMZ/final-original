import React, { useState, useEffect } from 'react';

const SalesRegister = () => {
    const [producto, setProducto] = useState('');
    const [cantidad, setCantidad] = useState(1);
    const [productos, setProductos] = useState([]);
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState('');
    const [carrito, setCarrito] = useState([]);
    const [total, setTotal] = useState(0);
    const [mensaje, setMensaje] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/api/productos')
            .then(res => res.json())
            .then(data => setProductos(data))
            .catch(err => console.error(err));

        fetch('http://localhost:5000/api/clientes')
            .then(res => res.json())
            .then(data => setClientes(data))
            .catch(err => console.error(err));
    }, []);

    const agregarAlCarrito = () => {
        if (!producto) return;
        const productoSeleccionado = productos.find(prod => prod.nombre === producto);
        if (productoSeleccionado) {
            const nuevoProducto = {
                id: productoSeleccionado.id,
                nombre: productoSeleccionado.nombre,
                cantidad,
                precio: productoSeleccionado.precio,
                subtotal: cantidad * productoSeleccionado.precio
            };
            setCarrito([...carrito, nuevoProducto]);
            setTotal(prev => prev + nuevoProducto.subtotal);
        }
        setProducto('');
        setCantidad(1);
    };

    const eliminarDelCarrito = (index) => {
        const itemEliminado = carrito[index];
        const nuevoCarrito = carrito.filter((_, i) => i !== index);
        setCarrito(nuevoCarrito);
        setTotal(prev => prev - itemEliminado.subtotal);
    };

    // const registrarVenta = () => {
    //     if (!clienteSeleccionado) {
    //         setMensaje('Selecciona un cliente antes de registrar la venta.');
    //         return;
    //     }
    //     if (carrito.length === 0) {
    //         setMensaje('Agrega al menos un producto al carrito.');
    //         return;
    //     }

    //     const ventaData = {
    //         usuario_id: 1,
    //         cliente_id: clienteSeleccionado,
    //         productos: carrito.map(item => ({
    //             id: item.id,
    //             cantidad: item.cantidad,
    //             precio_unitario: item.precio
    //         })),
    //         total
    //     };

    //     fetch('http://localhost:5000/api/ventas', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify(ventaData)
    //     })
    //         .then(res => res.json())
    //         .then(() => {
    //             setCarrito([]);
    //             setTotal(0);
    //             setClienteSeleccionado('');
    //             setMensaje('✅ Venta registrada correctamente.');
    //         })
    //         .catch(() => {
    //             setMensaje('❌ Error al registrar la venta.');
    //         });
    // };

    const registrarVenta = () => {
        if (!clienteSeleccionado) {
            setMensaje('Selecciona un cliente antes de registrar la venta.');
            return;
        }
        if (carrito.length === 0) {
            setMensaje('Agrega al menos un producto al carrito.');
            return;
        }

        console.log('Total de la venta:', total);  // Imprimir para ver el valor de total
        const ventaData = {
            usuario_id: 1,
            cliente_id: clienteSeleccionado,
            productos: carrito.map(item => ({
                id: item.id,
                cantidad: item.cantidad,
                precio_unitario: item.precio
            })),
            total
        };

        fetch('http://localhost:5000/api/ventas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(ventaData)
        })
            .then(res => res.json())
            .then(() => {
                setCarrito([]);
                setTotal(0);
                setClienteSeleccionado('');
                setMensaje('✅ Venta registrada correctamente.');
            })
            .catch(() => {
                setMensaje('❌ Error al registrar la venta.');
            });
    };


    return (
        <div className="p-6 max-w-6xl mx-auto space-y-6">
            <h2 className="text-4xl font-bold text-gray-800">🛒 Registro de Ventas</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-5 rounded-xl shadow space-y-4 border">
                    <h3 className="text-xl font-semibold">Seleccionar Cliente</h3>
                    <select
                        value={clienteSeleccionado}
                        onChange={(e) => setClienteSeleccionado(e.target.value)}
                        className="p-3 border rounded w-full focus:ring-2 focus:ring-blue-400"
                    >
                        <option value="">Seleccionar cliente...</option>
                        {clientes.map(cli => (
                            <option key={cli.id} value={cli.id}>{cli.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white p-5 rounded-xl shadow space-y-4 border md:col-span-2">
                    <h3 className="text-xl font-semibold">Agregar Productos</h3>
                    <div className="flex gap-3">
                        <select
                            value={producto}
                            onChange={(e) => setProducto(e.target.value)}
                            className="p-3 border rounded w-full focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="">Seleccionar producto...</option>
                            {productos.map(prod => (
                                <option key={prod.id} value={prod.nombre}>{prod.nombre}</option>
                            ))}
                        </select>

                        <input
                            type="number"
                            min="1"
                            value={cantidad}
                            onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                            className="p-3 border rounded w-24 text-center focus:ring-2 focus:ring-blue-400"
                        />

                        <button
                            onClick={agregarAlCarrito}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white p-5 rounded-xl shadow border">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="bg-blue-100 text-gray-700">
                            <th className="p-3 text-left">Producto</th>
                            <th className="p-3">Cantidad</th>
                            <th className="p-3">Precio</th>
                            <th className="p-3">Subtotal</th>
                            <th className="p-3">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carrito.map((item, index) => (
                            <tr key={index} className="text-center border-b hover:bg-gray-50">
                                <td className="p-3 text-left">{item.nombre}</td>
                                <td className="p-3">{item.cantidad}</td>
                                <td className="p-3">S/. {item.precio}</td>
                                <td className="p-3 font-semibold">S/. {item.subtotal}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => eliminarDelCarrito(index)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                                    >
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {carrito.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-4 text-gray-500 italic">No hay productos en el carrito.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center">
                <div className="text-3xl font-bold">
                    Total: <span className="text-green-600">S/. {total}</span>
                </div>

                <button
                    onClick={registrarVenta}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded text-lg shadow"
                >
                    Registrar Venta
                </button>
            </div>

            {mensaje && (
                <div className={`p-3 rounded text-white ${mensaje.includes('✅') ? 'bg-green-600' : 'bg-red-600'}`}>
                    {mensaje}
                </div>
            )}
        </div>
    );
};

export default SalesRegister;
