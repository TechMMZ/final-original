import React, { useState, useEffect } from 'react';
import AgregarClienteModal from '../components/AgregarClienteModal'; // Importa el modal de agregar cliente

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);

    // Función para obtener clientes
    const obtenerClientes = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/clientes');
            const data = await res.json();
            setClientes(data);
        } catch (error) {
            console.error('Error al obtener los clientes:', error);
        }
    };

    useEffect(() => {
        obtenerClientes(); // Obtener los clientes cuando el componente se monta
    }, []);

    const handleClienteAgregado = () => {
        obtenerClientes(); // Refrescar la lista de clientes cuando se agrega uno nuevo
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Clientes</h2>
            <button
                onClick={() => setMostrarModal(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mb-4"
            >
                Agregar Cliente
            </button>

            <table className="w-full table-auto mb-4">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="p-2">ID</th>
                        <th className="p-2">Nombre</th>
                        <th className="p-2">Correo</th>
                        <th className="p-2">Teléfono</th>
                        <th className='p-2'>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente.id} className="text-center">
                            <td className="p-2">{cliente.id}</td>
                            <td className="p-2">{cliente.nombre}</td>
                            <td className="p-2">{cliente.email}</td>
                            <td className="p-2">{cliente.telefono}</td>
                            <td className="p-2">{cliente.direccion}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {mostrarModal && (
                <AgregarClienteModal
                    onClose={() => setMostrarModal(false)}
                    onClienteAgregado={handleClienteAgregado}
                />
            )}
        </div>
    );
};

export default Clientes;
