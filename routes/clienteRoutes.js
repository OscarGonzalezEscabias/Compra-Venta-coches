const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers');

router.get('/', clienteController.clientes);

router.get('/add', clienteController.clienteAddFormulario);

router.post('/add', clienteController.clienteAdd);

module.exports=router;