// Importamos el objeto db que contiene todos los modelos
const { Personal } = require('../models'); 
const { personalSchema } = require('../utils/validators');

// LISTAR TODO EL PERSONAL
exports.listarPersonal = async (req, res) => {
    try {
        // En Sequelize, getAll() se reemplaza por findAll()
        const lista = await Personal.findAll({
            where: { activo: true } // Solo los que están activos
        });
        res.json(lista);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el personal", detalle: error.message });
    }
};

// CREAR PERSONAL
exports.crearPersonal = async (req, res) => {
    try {
        // 1. Validamos con Zod antes de tocar la base de datos
        const datosValidados = personalSchema.parse(req.body);
        
        // 2. Usamos el método .create() de Sequelize
        const nuevoEmpleado = await Personal.create(datosValidados);
        
        res.status(201).json(nuevoEmpleado);
    } catch (error) {
        // Manejo de errores de validación de Zod
        if (error.name === 'ZodError') {
            return res.status(400).json({ errors: error.errors });
        }
        // Manejo de errores de Sequelize (ej: cédula duplicada)
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ error: "La cédula ya está registrada" });
        }
        
        res.status(500).json({ error: "Error interno del servidor" });
    }
};