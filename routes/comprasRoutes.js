const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

router.get('/', comprasController.compras);

router.get('/add', comprasController.comprasAddFormulario);

router.post('/add', comprasController.comprasAdd);

router.get('/edit/:id', comprasController.comprasAddFormulario);

router.post('/edit/:id', comprasController.comprasEdit);

router.get('/del/:id', comprasController.comprasDelFormulario);

router.post('/del/:id', comprasController.comprasDel);

module.exports=router;