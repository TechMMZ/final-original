import React, { useEffect, useState } from 'react';
import ProductoCard from '../components/ProductoCard';

const Productos = () => {
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState('');
    const [carrito, setCarrito] = useState([]); // Estado para el carrito

    useEffect(() => {
        fetch('http://localhost:5000/api/productos')
            .then((response) => response.json())
            .then((data) => setProductos(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    // Filtrar productos por nombre
    const filteredProductos = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(search.toLowerCase())
    );

    // Función para agregar productos al carrito
    const agregarAlCarrito = (producto) => {
        // Verificar si el producto ya existe en el carrito
        const productoExistente = carrito.find((item) => item.id === producto.id);

        if (productoExistente) {
            // Si el producto ya está en el carrito, aumentamos la cantidad
            setCarrito((prevCarrito) =>
                prevCarrito.map((item) =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 } // Incrementamos la cantidad
                        : item
                )
            );
        } else {
            // Si el producto no está en el carrito, lo agregamos con cantidad 1
            setCarrito((prevCarrito) => [
                ...prevCarrito,
                { ...producto, cantidad: 1 },
            ]);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Productos Disponibles</h1>
            <input
                type="text"
                className="border p-2 rounded mb-4 w-full max-w-sm"
                placeholder="Buscar productos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProductos.length > 0 ? (
                    filteredProductos.map((producto) => (
                        <div key={producto.id} className="border p-4 rounded shadow-md">
                            <ProductoCard producto={producto} />
                            {/* Botón para agregar al carrito */}
                            <button
                                onClick={() => agregarAlCarrito(producto)}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos.</p>
                )}
            </div>

            {/* Mostrar los productos en el carrito */}
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Carrito de Compras</h2>
                {carrito.length > 0 ? (
                    <div>
                        <ul>
                            {carrito.map((producto) => (
                                <li key={producto.id} className="flex justify-between py-2">
                                    <span>
                                        {producto.nombre} (Cantidad: {producto.cantidad})
                                    </span>
                                    <span>
                                        ${producto.precio * producto.cantidad}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <div className="text-right mt-4">
                            <h3 className="font-semibold">
                                Total: $
                                {carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0)}
                            </h3>
                        </div>
                    </div>
                ) : (
                    <p>No hay productos en el carrito.</p>
                )}
            </div>
        </div>
    );
};

export default Productos;
