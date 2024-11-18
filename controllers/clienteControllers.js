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

exports.clienteEditFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM Cliente WHERE ID_Cliente=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL cliente')
        else {
          if (respuesta.length > 0) {
            res.render('clientes/edit', { clientes: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR ACTUALIZAR EL cliente, NO EXISTE')
          }
        }
      });
};

exports.clienteEdit = (req, res) => {

  const { ID_Cliente, nombre,telefono, direccion } = req.body;
  const paramId = req.params['ID_Cliente'];

  if (isNaN(ID_Cliente) || isNaN(paramId) || ID_Cliente !== paramId) {
    res.send('ERROR ACTUALIZANDO')
  } else {
    db.query(
      'UPDATE `cliente` SET `nombre` = ?,`telefono` = ?, `direccion` = ?' +
      ' WHERE `ID_Cliente` = ?',
      [nombre,telefono, direccion, ID_Cliente],
      (error, respuesta) => {
        if (error) {
          res.send('ERROR ACTUALIZANDO CLIENTE' + error)
          console.log(error)
        }
        else res.redirect('/clientes')
      }
    );
  }
};

exports.clienteDelFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM cliente WHERE ID_Cliente=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR BORRAR EL CLIENTE')
        else {
          if (respuesta.length > 0) {
            res.render('clientes/del', { clientes: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR BORRAR EL CLIENTE, NO EXISTE')
          }
        }
      });

};