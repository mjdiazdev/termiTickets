const { Viaje, ViajeParada, Vehiculo, Personal, Boleto } = require('../models');

exports.crearViaje = async (req, res) => {
    try {
        const { vehiculo_id, chofer_id, colector_id, fecha_salida, paradas } = req.body;

        // Creamos el viaje y sus paradas en una sola transacción
        const nuevoViaje = await Viaje.create({
            vehiculo_id,
            chofer_id,
            colector_id,
            fecha_salida,
            paradas // Sequelize permite pasar objetos anidados
        }, {
            include: [{ model: ViajeParada, as: 'paradas' }]
        });

        res.status(201).json(nuevoViaje);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.listarViajesDisponibles = async (req, res) => {
    try {
        const viajes = await Viaje.findAll({
            where: { estado: 'PROGRAMADO' },
            include: [
                { model: Vehiculo },
                { model: Personal, as: 'chofer' },
                { model: ViajeParada, as: 'paradas' }
            ]
        });

        // Aquí aplicamos la lógica de "Quedan pocos boletos" para el frontend
        const respuesta = await Promise.all(viajes.map(async (v) => {
            const vendidos = await Boleto.count({ 
                include: [{ model: ViajeParada, where: { viaje_id: v.id } }] 
            });
            const disponibles = v.Vehiculo.capacidad_maxima - vendidos;
            
            return {
                ...v.toJSON(),
                asientos_disponibles: disponibles,
                alerta_cupos: disponibles <= 3 // Flag para el Frontend
            };
        }));

        res.json(respuesta);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};