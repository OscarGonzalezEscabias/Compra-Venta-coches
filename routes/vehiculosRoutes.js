const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoControllers');

router.get('/', vehiculoController.vehiculos);

router.get('/add', vehiculoController.vehiculoAddFormulario);

router.post('/add', vehiculoController.vehiculoAdd);

module.exports=router;