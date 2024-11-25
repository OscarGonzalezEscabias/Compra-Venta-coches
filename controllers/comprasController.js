const db = require('../db')

exports.compras = (req, res) => {
  db.query(
    'SELECT * FROM `Compra`',
    (err, response) => {
      if (err) res.send('ERROR al hacer la consulta')
      else res.render('compras/list', { compras: response })
    }
  );
};

exports.comprasAdd = (req, res) => {
  const { Fecha_Compra, Precio_Compra } = req.body;
  db.query(
    'INSERT INTO Compra (Fecha_Compra, Precio_Compra) VALUES (?,?)',
    [Fecha_Compra, Precio_Compra],
    (error, respuesta) => {
      if (error) res.send('ERROR INSERTANDO COMPRA' + req.body)
      else res.redirect('/compras')
    }
  );
};

exports.comprasAddFormulario = (req, res) => {
  res.render('compras/add');
};

exports.comprasEditFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM Compra WHERE ID_Compra=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR AL INTENTAR ACTUALIZAR LA COMPRA')
        else {
          if (respuesta.length > 0) {
            res.render('compras/edit', { compras: respuesta[0] })
          } else {
            res.send('ERROR AL INTENTAR ACTUALIZAR LA COMPRA, NO EXISTE')
          }
        }
      });
};

exports.comprasEdit = (req, res) => {

  const { ID_Compra, Fecha_Compra, Precio_Compra } = req.body;
  const paramId = req.params['ID_Compra'];

  if (isNaN(ID_Compra) || isNaN(paramId) || ID_Compra !== paramId) {
    res.send('ERROR ACTUALIZANDO')
  } else {
    db.query(
      'UPDATE `Compra` SET `Fecha_Compra` = ?,`Precio_Compra` = ?' +
      ' WHERE `ID_Compra` = ?',
      [Fecha_Compra, Precio_Compra, ID_Compra],
      (error, respuesta) => {
        if (error) {
          res.send('ERROR ACTUALIZANDO COMPRA' + error)
          console.log(error)
        }
        else res.redirect('/compras')
      }
    );
  }
};

exports.comprasDelFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM Compra WHERE ID_Compra=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR BORRAR LA COMPRA')
        else {
          if (respuesta.length > 0) {
            res.render('compras/del', { compras: respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR BORRAR LA COMPRA, NO EXISTE')
          }
        }
      });
};

exports.comprasDel = (req, res) => {

  const { ID_Compra, Fecha_Compra, Precio_Compra } = req.body;
  const paramId = req.params['ID_Compra'];

  if (isNaN(ID_Compra) || isNaN(paramId) || ID_Compra !== paramId) {
    res.send('ERROR BORRANDO')
  } else {
    db.query(
      'DELETE FROM Compra WHERE ID_Compra=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR BORRANDO COMPRA' + req.body)
        else res.redirect('/compras')
      }
    );
  }
};
