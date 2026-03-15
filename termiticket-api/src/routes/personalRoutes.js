const express = require('express');
const router = express.Router();
const personalController = require('../controllers/personalController');
const authMiddleware = require('../middlewares/authMiddleware');

// Todas estas rutas requieren estar logueado
router.use(authMiddleware);

router.get('/', personalController.listarPersonal);
router.post('/', personalController.crearPersonal);

module.exports = router;