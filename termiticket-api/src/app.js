const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const personalRoutes = require('./routes/personalRoutes');
const vehiculoRoutes = require('./routes/vehiculoRoutes');
const viajeRoutes = require('./routes/viajeRoutes');
const ventaRoutes = require('./routes/ventaRoutes');

// Middlewares
app.use(cors());
app.use(express.json()); // Para recibir JSON en el body

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: "Bienvenido a TermiTicket API" });
});

// Usar rutas (agrégalo antes del app.listen)
app.use('/api/auth', authRoutes);
app.use('/api/personal', personalRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/viajes', viajeRoutes);
app.use('/api/ventas', ventaRoutes);

// Manejo de errores global (Muy importante para UX)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Algo salió mal en el servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});