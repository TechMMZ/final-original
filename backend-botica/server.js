const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productosRoutes = require('./src/routes/productosRoutes');
const ventasRoutes = require('./src/routes/ventasRoutes');
const clientesRoutes = require('./src/routes/clientesRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Configuración del entorno
dotenv.config();

// Inicializar Express
const app = express();
app.use(cors());
app.use(express.json());  // Para poder recibir datos en formato JSON

// Rutas
app.use('/api/productos', productosRoutes);
app.use('/api/ventas', ventasRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/auth', authRoutes);

// Puerto de escucha
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port localhost:${PORT}`);
});
