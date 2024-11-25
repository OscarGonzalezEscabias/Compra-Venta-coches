const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoControllers');

router.get('/', vehiculoController.vehiculos);

router.get('/add', vehiculoController.vehiculoAddFormulario);

router.post('/add', vehiculoController.vehiculoAdd);

router.get('/edit/:id', vehiculoController.vehiculoEditFormulario);

router.post('/edit/:id', vehiculoController.vehiculoEdit);

router.get('/del/:id' , vehiculoController.vehiculoDelFormulario);

router.post('/del/:id' , vehiculoController.vehiculoDel);

module.exports=router;