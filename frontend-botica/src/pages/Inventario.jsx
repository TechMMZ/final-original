import React, { useState, useEffect } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import AgregarProductoModal from '../components/AgregarProductoModal';
import EditarProductoModal from '../components/EditarProductoModal';

const Inventario = () => {
    const [mostrarModal, setMostrarModal] = useState(false);
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [productoEditar, setProductoEditar] = useState(null); // Estado para el producto a editar

    const obtenerProductos = () => {
        fetch('http://localhost:5000/api/productos')
            .then(res => res.json())
            .then(data => {
                setProductos(data);
                setProductosFiltrados(data);
            })
            .catch(err => console.error('Error al obtener productos:', err));
    };

    useEffect(() => {
        obtenerProductos();
    }, []);

    const filtrarProductos = (e) => {
        const valorBusqueda = e.target.value.toLowerCase();
        setBusqueda(valorBusqueda);

        const productosFiltrados = productos.filter((producto) => {
            const nombre = producto.nombre ? producto.nombre.toLowerCase() : '';
            const categoria = producto.categoria ? producto.categoria.toLowerCase() : '';
            return nombre.includes(valorBusqueda) || categoria.includes(valorBusqueda);
        });

        setProductosFiltrados(productosFiltrados);
    };

    const eliminarProducto = async (productoId) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
        if (confirmacion) {
            try {
                const response = await fetch(`http://localhost:5000/api/productos/${productoId}`, {
                    method: 'DELETE',
                });

                const result = await response.json();

                if (response.ok) {
                    if (result.message === 'Producto eliminado exitosamente') {
                        obtenerProductos();
                    } else {
                        console.error('Error: El producto no pudo ser eliminado');
                    }
                } else {
                    console.error('Error en la respuesta:', result.error || result);
                }
            } catch (error) {
                console.error('Error al eliminar el producto:', error.message || error);
            }
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-8">📦 Gestión de Inventario</h1>
                <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition duration-200"
                        onClick={() => setMostrarModal(true)}
                    >
                        + Agregar Producto
                    </button>
                    <input
                        type="text"
                        placeholder="🔍 Buscar por nombre o categoría"
                        className="border border-gray-300 focus:ring-2 focus:ring-blue-500 p-3 rounded-lg w-full md:w-80 shadow-sm"
                        value={busqueda}
                        onChange={filtrarProductos}
                    />
                </div>

                {mostrarModal && (
                    <AgregarProductoModal
                        onClose={() => setMostrarModal(false)}
                        onProductoAgregado={obtenerProductos}
                    />
                )}

                {productoEditar && (
                    <EditarProductoModal
                        productoEditar={productoEditar}
                        onClose={() => setProductoEditar(null)}  // Limpiar al cerrar
                        onProductoEditado={obtenerProductos}  // Actualizar productos después de editar
                    />
                )}

                <div className="overflow-x-auto shadow rounded-lg">
                    <table className="w-full border-collapse bg-white">
                        <thead>
                            <tr className="bg-blue-100 text-gray-800 uppercase text-sm leading-normal">
                                <th className="p-4 text-left">Nombre</th>
                                <th className="p-4 text-left">Descripción</th>
                                <th className="p-4 text-left">Precio</th>
                                <th className="p-4 text-left">Categoría</th>
                                <th className="p-4 text-left">Stock</th>
                                <th className="p-4 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map((prod, index) => (
                                <tr
                                    key={prod.id}
                                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition`}
                                >
                                    <td className="p-4 border-b">{prod.nombre}</td>
                                    <td className="p-4 border-b">{prod.descripcion}</td>
                                    <td className="p-4 border-b text-green-600 font-medium">${prod.precio}</td>
                                    <td className="p-4 border-b">{prod.categoria}</td>
                                    <td className="p-4 border-b">{prod.stock}</td>
                                    <td className="p-4 border-b flex justify-center gap-3">
                                        <button
                                            className="p-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow transition"
                                            title="Editar"
                                            onClick={() => setProductoEditar(prod)} // Setea el producto a editar
                                        >
                                            <Pencil size={18} />
                                        </button>
                                        <button
                                            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow transition"
                                            title="Eliminar"
                                            onClick={() => eliminarProducto(prod.id)} // Eliminar el producto
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Inventario;
