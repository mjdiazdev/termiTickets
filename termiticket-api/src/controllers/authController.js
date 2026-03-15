const { User } = require('../models');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // .create disparará el hook 'beforeCreate' que encripta la clave
        const newUser = await User.create({
            nombre,
            email,
            password_hash: password, // El hook lo convertirá en hash
            rol
        });

        res.status(201).json({ 
            message: "Usuario registrado", 
            user: { id: newUser.id, nombre: newUser.nombre } 
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: "El email ya existe" });
        }
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar usuario
        const user = await User.findOne({ where: { email, activo: true } });
        
        // 2. Usar el método que creamos en el prototipo del modelo
        if (!user || !(await user.validPassword(password))) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        // 3. Generar JWT
        const token = jwt.sign(
            { id: user.id, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            token,
            user: { id: user.id, nombre: user.nombre, rol: user.rol }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};