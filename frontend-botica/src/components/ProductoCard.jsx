// src/components/ProductoCard.jsx
import React from 'react';

const ProductoCard = ({ producto }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">{producto.nombre}</h3>
            <p className="text-gray-700">{producto.descripcion}</p>
            <p className="text-lg text-green-500">Precio: ${producto.precio}</p>
            <button className="mt-2 bg-blue-500 text-white p-2 rounded-md">
                Añadir al carrito
            </button>
        </div>
    );
};

export default ProductoCard;
