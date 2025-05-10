/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

const AgregarClienteModal = ({ onClose, onClienteAgregado }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:5000/api/clientes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(res => res.json())
            .then(data => {
                alert('✅ Cliente agregado');
                onClienteAgregado();
                onClose();
            })
            .catch(err => {
                console.error(err);
                alert('❌ Error al agregar cliente');
            });
    };

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">➕ Agregar Cliente</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {['nombre', 'email', 'telefono', 'direccion'].map((campo) => (
                        <input
                            key={campo}
                            type={campo === 'email' ? 'email' : 'text'}
                            name={campo}
                            placeholder={campo.charAt(0).toUpperCase() + campo.slice(1)}
                            value={formData[campo]}
                            onChange={handleChange}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    ))}
                    <div className="flex justify-end space-x-2 pt-4">
                        <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
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

export default AgregarClienteModal;
