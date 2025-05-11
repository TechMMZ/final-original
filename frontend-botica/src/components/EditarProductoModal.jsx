/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const EditarProductoModal = ({ productoEditar, onClose, onProductoEditado }) => {

    useEffect(() => {
        // Bloquear scroll al abrir
        document.body.style.overflow = 'hidden';

        // Restaurar scroll al cerrar
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        categoria: '',
        stock: ''
    });

    useEffect(() => {
        if (productoEditar) {
            setFormData({
                nombre: productoEditar.nombre,
                descripcion: productoEditar.descripcion,
                precio: productoEditar.precio,
                categoria: productoEditar.categoria,
                stock: productoEditar.stock
            });
        }
    }, [productoEditar]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:5000/api/productos/${productoEditar.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: formData.nombre,
                descripcion: formData.descripcion,
                precio: parseFloat(formData.precio),
                categoria: formData.categoria,
                stock: parseInt(formData.stock)
            }),
        })
            .then(res => res.json())
            .then(data => {
                alert('✅ Producto actualizado');
                onProductoEditado(); // Refrescar lista de productos después de editar
                onClose(); // Cerrar el modal
            })
            .catch(err => {
                console.error(err);
                alert('❌ Error al actualizar el producto');
            });
    };

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">✏️ Editar Producto</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['nombre', 'descripcion', 'precio', 'categoria', 'stock'].map((campo) => (
                        <input
                            key={campo}
                            type={campo === 'precio' || campo === 'stock' ? 'number' : 'text'}
                            name={campo}
                            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                            value={formData[campo]}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    ))}
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
                        >
                            Guardar
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditarProductoModal;
