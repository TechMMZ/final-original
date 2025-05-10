import React, { useState, useEffect } from 'react';
import DetalleVentaModal from '../components/DetalleVentaModal'; // Importar el modal

const Ventas = () => {
    const [ventas, setVentas] = useState([]);
    const [detalleVenta, setDetalleVenta] = useState(null);  // Estado para el modal de detalles
    const [mostrarModal, setMostrarModal] = useState(false);

    // Obtener ventas desde el backend
    const obtenerVentas = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/ventas');
            const data = await response.json();
            setVentas(data);
        } catch (error) {
            console.error('Error al obtener ventas:', error);
        }
    };

    useEffect(() => {
        obtenerVentas();
    }, []);

    // Ver detalles de una venta
    const verDetalles = (ventaId) => {
        const venta = ventas.find(v => v.id === ventaId);
        setDetalleVenta(venta);
        setMostrarModal(true);
    };

    // Eliminar una venta
    const eliminarVenta = async (ventaId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/ventas/${ventaId}`, {
                method: 'DELETE',
            });
            const result = await response.json();
            if (result.mensaje === 'Venta eliminada exitosamente.') {
                obtenerVentas(); // Refrescar la lista de ventas
            }
        } catch (error) {
            console.error('Error al eliminar la venta:', error);
        }
    };

    // Cerrar el modal de detalles
    const cerrarModal = () => {
        setMostrarModal(false);
        setDetalleVenta(null);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Historial de Ventas</h2>
            <table className="w-full table-auto mb-4">
                <thead>
                    <tr className="bg-blue-100">
                        <th className="p-2">ID</th>
                        <th className="p-2">Fecha</th>
                        <th className="p-2">Cliente</th>
                        <th className="p-2">Total</th>
                        <th className="p-2">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ventas.map((venta) => (
                        <tr key={venta.id} className="text-center">
                            <td className="p-2">{venta.id}</td>
                            <td className="p-2">{new Date(venta.fecha).toLocaleDateString()}</td>
                            <td className="p-2">{venta.cliente}</td>
                            <td className="p-2">S/. {venta.total}</td>
                            <td className="p-2">
                                <button
                                    onClick={() => verDetalles(venta.id)}
                                    className="bg-blue-500 text-white px-4 py-1 rounded mr-2"
                                >
                                    Ver Detalles
                                </button>
                                <button
                                    onClick={() => eliminarVenta(venta.id)}
                                    className="bg-red-500 text-white px-4 py-1 rounded"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal de detalles */}
            {mostrarModal && (
                <DetalleVentaModal
                    detalleVenta={detalleVenta}
                    onClose={cerrarModal}
                />
            )}
        </div>
    );
};

export default Ventas;
