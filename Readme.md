# FASTCAR, COMPRA-VENTA DE COCHES

Creamos el package.json

```bash
npm install --save express express-session mysql2 pug body-parser
```

¿Qué es cada cosa?

* **express**: servidor Web para node.js
* **express-session**: gestiona sesiones (HTTP) entre el servido Web/cliente Web
* **mysql2**: driver para conectar a mysql. 
* **pug**: motor HTML
* **body_parser**: para convertir los datos de un formulario (verbos GET y POST) en JSON.
* **dotenv**: para cargar archivos de configuración de entorno.

Inicializamos el repositorio(hemos creado el .gitignore antes):

```bash
git init
git add .
git commit -m "Inicio proyecto"
```

Creamos la base de datos compraventa a partir del diagrama:

![](Database.png)

* **Cliente**: Contiene la información básica de los clientes.
* **Vehiculo**: Almacena los datos de los vehículos.
* **Venta**: Registra las ventas realizadas por los clientes.
* **Compra**: Registra las compras realizadas por los clientes.

Y creamos el docker-compose:

```yml
version: '3.1'

services:

  adminer:
    image: adminer
    restart: "no"
    ports:
      - ${ADMINER_PORT}:8080

  db-compraventa:
    image: mysql:latest
    restart: "no"
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    ports:
      - ${MYSQL_PORT}:3306
    volumes:
      - ./scripts:/docker-entrypoint-initdb.d
```

Ahora creamos el app.js con los siguientes require y cargando el .env: 

```javascript
const express = require('express');
const session = require('express-session');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

require('dotenv').config({ path: './stack/.env' });

/**
 * Crea el servidor Web
 */
const app = express();
const port = process.env.SERVICE_PORT;
```

También creamos el db.js cargando el .env:

```javascript
const mysql = require('mysql2'); 
require('dotenv').config({ path: 'stack/.env' }); 

/**
 * Conectamos a la base de datos
 */
const db = mysql.createConnection({
    host:       process.env.MYSQL_HOST,
    port:       process.env.MYSQL_PORT,
    user:       process.env.MYSQL_ROOT_USERNAME,
    password:   process.env.MYSQL_ROOT_PASSWORD,
    database:   process.env.MYSQL_DATABASE,
  });

db.connect(err => {
    if (err) {
      console.error(
        'Error al conectar a MySQL:', err);
      return;
    }
    console.log('Conexión exitosa a MySQL');
  });

  module.exports=db;
```

Después, creamos los pug para la vista del index, crud y maestro-detalle, y también lo configuramos en el app.js para verlo:

```javascript
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
```

Cada vez que queramos ver nuestra aplicación tendremos que hacer el siguiente comando:

```bash
node app.js
```

Ahora crearemos las rutas y el controller:

### ROUTES de COMPRAS

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /compras | Listar todos las compras
GET | /compras/add | Muestra el formulario para añadir una compra
POST | /compras/add | Añade una compra a la BBDD
GET | /compras/edit/:id | Muestra el formulario para editar la compra con ese ID
POST | /compras/edit/:id | Guarda la información de la compra con ese ID
GET | /compras/del/:id | Muestra el formulario para borrar la compra con ese ID
POST | /compras/del/:id | Borra la compra con ese ID
GET | /compras/annos | Obtiene los años de las compras
POST | /compras/filtrar | Filtra por año de compra

### ROUTES de VENTAS

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /ventas | Listar todos las ventas
GET | /ventas/add | Muestra el formulario para añadir una venta
POST | /ventas/add | Añade una venta a la BBDD
GET | /ventas/edit/:id | Muestra el formulario para editar la venta con ese ID
POST | /ventas/edit/:id | Guarda la información de la venta con ese ID
GET | /ventas/del/:id | Muestra el formulario para borrar la venta con ese ID
POST | /ventas/del/:id | Borra la venta con ese ID
GET | /ventas/annos | Obtiene los años de las ventas
POST | /ventas/filtrar | Filtra por año de venta

### ROUTES de CLIENTES

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /clientes | Listar todos las clientes
GET | /clientes/add | Muestra el formulario para añadir un cliente
POST | /clientes/add | Añade un cliente a la BBDD
GET | /clientes/edit/:id | Muestra el formulario para editar el cliente con ese ID
POST | /clientes/edit/:id | Guarda la información de el cliente con ese ID
GET | /clientes/del/:id | Muestra el formulario para borrar el cliente con ese ID
POST | /clientes/del/:id | Borra el cliente con ese ID

### ROUTES de VEHICULOS

VERBO | RUTA | ACCIÓN
------|------|-------
GET | /vehiculos | Listar todos los vehiculos
GET | /vehiculos/add | Muestra el formulario para añadir un vehiculo
POST | /vehiculos/add | Añade un vehiculo a la BBDD
GET | /vehiculos/edit/:id | Muestra el formulario para editar el vehiculo con ese ID
POST | /vehiculos/edit/:id | Guarda la información de el vehiculo con ese ID
GET | /vehiculos/del/:id | Muestra el formulario para borrar el vehiculo con ese ID
POST | /vehiculos/del/:id | Borra el vehiculo con ese ID
GET | /vehiculos/marcas | Obtiene las marcas de los vehiculos
POST | /vehiculos/filtrar | Filtra por marca de vehiculo
