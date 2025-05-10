import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Registrar los elementos de Chart.js
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

function Dashboard() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Función para obtener el stock de productos
    const fetchProductosStock = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/productos/stock');
            setProductos(response.data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError('Error al obtener los datos');
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProductosStock();
    }, []);

    // Preparar los datos para el gráfico
    const data = {
        labels: productos.map(item => item.nombre),  // Nombres de los productos
        datasets: [
            {
                label: 'Stock de Productos',
                data: productos.map(item => item.stock),  // Valores del stock
                backgroundColor: 'rgba(75, 192, 192, 0.5)', // Color de las barras
                borderColor: 'rgba(75, 192, 192, 1)', // Color del borde
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Stock de Productos</h1>

            {/* Mostrar mensaje de carga */}
            {loading && <p>Cargando datos...</p>}

            {/* Mostrar mensaje de error */}
            {error && <p className="text-red-600">{error}</p>}

            {/* Mostrar gráfico de barras */}
            {!loading && !error && productos.length > 0 && (
                <div className="my-8">
                    <Bar data={data} />
                </div>
            )}

            {/* Si no hay datos */}
            {!loading && !error && productos.length === 0 && <p>No hay productos disponibles.</p>}
        </div>
    );
}

export default Dashboard;
