const db = require('../db')

exports.clientes = (req, res) => {
  db.query(
    'SELECT * FROM `Cliente`',
    (err, response) => {
      if (err) res.send('ERROR al hacer la consulta')
      else res.render('clientes/list', { clientes: response })
    }
  );
};

exports.clienteAdd = (req, res) => {
  const { nombre, telefono, direccion } = req.body;
  db.query(
    'INSERT INTO Cliente (nombre, telefono, direccion) VALUES (?,?,?)',
    [nombre, telefono, direccion],
    (error, respuesta) => {
      if (error) res.send('ERROR INSERTANDO CLIENTE' + req.body)
      else res.redirect('/clientes')
    }
  );
};


exports.clienteAddFormulario = (req, res) => {
  res.render('clientes/add');
};