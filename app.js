/**
 * Aplicación full-stack empresa compra venta de coches.
 */
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const clienteRouter = require('./routes/clienteRoutes');
const vehiculoRouter = require('./routes/vehiculosRoutes');

require('dotenv').config({ path: './stack/.env' });

/**
 * Crea el servidor Web
 */
const app = express();
const port = process.env.SERVICE_PORT;

/**
 * Configuramos el motor de plantillas 
 */
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Delegamos todas las rutas que comienzan por clientes ...
 * al enrutador correspondiente
 */
app.use('/clientes', clienteRouter);
app.use('/vehiculos',vehiculoRouter);

app.get('/', (req, res) => {
    res.render('index')
});

/**
 * Siempre lo último que hacemos
 */
app.listen(
    port, () => {
        console.log(`Servidor iniciado en http://localhost:${port}`);
    });