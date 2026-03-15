const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');
const authMiddleware = require('../middlewares/authMiddleware');

// Proteger todas las rutas de vehículos
router.use(authMiddleware);

router.get('/', vehiculoController.listarVehiculos);
router.post('/', vehiculoController.crearVehiculo);
router.put('/:id', vehiculoController.actualizarVehiculo);

module.exports = router;