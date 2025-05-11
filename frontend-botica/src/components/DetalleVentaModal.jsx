import React, { useEffect } from 'react';

const DetalleVentaModal = ({ detalleVenta, onClose }) => {
    useEffect(() => {
        // Bloquear scroll al abrir
        document.body.style.overflow = 'hidden';

        // Restaurar scroll al cerrar
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    if (!detalleVenta) return null;

    return (
        <div className="fixed inset-0 bg-transparent backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-2xl">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">🧾 Detalles de Venta</h2>

                <div className="space-y-2 mb-6 text-gray-700">
                    <p><strong>👤 Cliente:</strong> {detalleVenta.cliente}</p>
                    <p><strong>📅 Fecha:</strong> {new Date(detalleVenta.fecha).toLocaleDateString()}</p>
                    <p><strong>💵 Total:</strong> S/. {detalleVenta.total.toFixed(2)}</p>
                </div>

                <h3 className="text-xl font-semibold mb-4 text-gray-800">🛒 Productos Vendidos</h3>

                {detalleVenta.productos?.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full border border-gray-300 rounded-lg">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="p-3 text-left">Producto</th>
                                    <th className="p-3 text-left">Cantidad</th>
                                    <th className="p-3 text-left">Precio Unitario (S/.)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {detalleVenta.productos.map((producto, index) => (
                                    <tr key={index} className="border-t">
                                        <td className="p-3">{producto.nombre}</td>
                                        <td className="p-3">{producto.cantidad}</td>
                                        <td className="p-3">S/. {Number(producto.precio_unitario).toFixed(2)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-gray-500 mt-2">No hay productos registrados para esta venta.</p>
                )}


                <div className="flex justify-end space-x-2 pt-6">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DetalleVentaModal;
