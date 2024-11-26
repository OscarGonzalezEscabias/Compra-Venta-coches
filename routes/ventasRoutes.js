const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.ventas);

router.get('/add', ventasController.ventasAddFormulario);

router.post('/add', ventasController.ventasAdd);

router.get('/edit/:id', ventasController.ventasAddFormulario);

router.post('/edit/:id', ventasController.ventasEdit);

router.get('/del/:id', ventasController.ventasDelFormulario);

router.post('/del/:id', ventasController.ventasDel);

router.get('/annos', ventasController.ventasPorAño);

router.post('/filtrar', ventasController.filtrarVentasPorAño);

module.exports=router;