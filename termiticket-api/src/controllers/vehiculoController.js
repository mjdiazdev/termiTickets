const { Vehiculo } = require('../models');

// Obtener todos los vehículos activos
exports.listarVehiculos = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.findAll({ where: { activo: true } });
        res.json(vehiculos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener vehículos", detalle: error.message });
    }
};

// Crear un nuevo vehículo
exports.crearVehiculo = async (req, res) => {
    try {
        const { placa, capacidad_maxima, marca } = req.body;

        // Validación básica manual (además de la de Sequelize)
        if (!placa || !capacidad_maxima) {
            return res.status(400).json({ message: "Placa y capacidad son obligatorias" });
        }

        const nuevoVehiculo = await Vehiculo.create({ placa, capacidad_maxima, marca });
        res.status(201).json(nuevoVehiculo);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "La placa ya está registrada" });
        }
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un vehículo
exports.actualizarVehiculo = async (req, res) => {
    try {
        const { id } = req.params;
        const vehiculo = await Vehiculo.findByPk(id);

        if (!vehiculo) return res.status(404).json({ message: "Vehículo no encontrado" });

        await vehiculo.update(req.body);
        res.json({ message: "Vehículo actualizado correctamente", vehiculo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};