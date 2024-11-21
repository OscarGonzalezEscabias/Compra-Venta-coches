const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.ventas);

router.get('/add', ventasController.ventasAddFormulario);

router.post('/add', ventasController.ventasAdd);

module.exports=router;