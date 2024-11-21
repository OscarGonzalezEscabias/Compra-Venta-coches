const express = require('express');
const router = express.Router();
const comprasController = require('../controllers/comprasController');

router.get('/', comprasController.compras);

router.get('/add', comprasController.comprasAddFormulario);

router.post('/add', comprasController.comprasAdd);

module.exports=router;