const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viajeController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', viajeController.listarViajesDisponibles);
router.post('/', viajeController.crearViaje);

module.exports = router;