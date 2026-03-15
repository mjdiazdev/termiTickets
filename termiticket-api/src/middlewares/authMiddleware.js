const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Formato: "Bearer TOKEN"

    if (!token) return res.status(401).json({ message: "Acceso denegado. No hay token." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Añadimos los datos del usuario al request
        next();
    } catch (error) {
        res.status(401).json({ message: "Token no válido" });
    }
};