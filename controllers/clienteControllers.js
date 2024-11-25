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
            res.render('clientes/edit', { cliente: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR ACTUALIZAR EL cliente, NO EXISTE')
          }
        }
      });
};

exports.clienteEdit = (req, res) => {
  const { id, nombre, telefono, direccion } = req.body; 
  const paramId = req.params['id']; 

  if (isNaN(id) || isNaN(paramId) || parseInt(id) !== parseInt(paramId)) {
    return res.send('ERROR: Datos inválidos.');
  }

  db.query(
    'UPDATE Cliente SET Nombre = ?, Telefono = ?, Direccion = ? WHERE ID_Cliente = ?',
    [nombre, telefono, direccion, id],
    (error, respuesta) => {
      if (error) {
        console.error('Error al actualizar cliente:', error);
        return res.send('Error actualizando cliente.');
      }
      res.redirect('/clientes');
    }
  );
};

exports.clienteDelFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM Cliente WHERE ID_Cliente=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR BORRAR EL cliente')
        else {
          if (respuesta.length > 0) {
            res.render('clientes/del', { cliente: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR BORRAR EL cliente, NO EXISTE')
          }
        }
      });

};

exports.clienteDel = (req, res) => {

  const { id } = req.body;
  const paramId = req.params['id'];

  if (isNaN(id) || isNaN(paramId) || id !== paramId) {
    res.send('ERROR BORRANDO')
  } else {
    db.query(
      'DELETE FROM Cliente WHERE ID_Cliente=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR BORRANDO cliente' + req.body)
        else res.redirect('/clientes')
      }
    );
  }
};




