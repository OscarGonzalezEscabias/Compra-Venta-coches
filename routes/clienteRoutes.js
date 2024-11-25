const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteControllers');

router.get('/', clienteController.clientes);

router.get('/add', clienteController.clienteAddFormulario);

router.post('/add', clienteController.clienteAdd);

router.get('/edit/:id', clienteController.clienteEditFormulario);

router.post('/edit/:id', clienteController.clienteEdit);

router.get('/del/:id' , clienteController.clienteDelFormulario);

router.post('/del/:id' , clienteController.clienteDel);

module.exports=router;