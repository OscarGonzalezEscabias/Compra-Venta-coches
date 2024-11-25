const db = require('../db')

exports.ventas = (req, res) => {
  db.query(
    'SELECT * FROM `Venta`',
    (err, response) => {
      if (err) res.send('ERROR al hacer la consulta')
      else res.render('ventas/list', { ventas: response })
    }
  );
};

exports.ventasAdd = (req, res) => {
  const { Fecha_Venta, Total } = req.body;
  db.query(
    'INSERT INTO Venta (Fecha_Venta, Total) VALUES (?,?)',
    [Fecha_Venta, Total],
    (error, respuesta) => {
      if (error) res.send('ERROR INSERTANDO VENTA' + req.body)
      else res.redirect('/ventas')
    }
  );
};

exports.ventasAddFormulario = (req, res) => {
    res.render('ventas/add');
  };

  exports.ventasEditFormulario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT * FROM Venta WHERE ID_Venta=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR AL INTENTAR ACTUALIZAR LA VENTA')
          else {
            if (respuesta.length > 0) {
              res.render('ventas/edit', { ventas: respuesta[0] })
            } else {
              res.send('ERROR AL INTENTAR ACTUALIZAR LA VENTA, NO EXISTE')
            }
          }
        });
  };
  
  exports.ventasEdit = (req, res) => {
  
    const { ID_Venta, Fecha_Venta, Total } = req.body;
    const paramId = req.params['ID_Venta'];
  
    if (isNaN(ID_Venta) || isNaN(paramId) || ID_Venta !== paramId) {
      res.send('ERROR ACTUALIZANDO')
    } else {
      db.query(
        'UPDATE `Venta` SET `Fecha_Venta` = ?,`Total` = ?' +
        ' WHERE `ID_Venta` = ?',
        [Fecha_Venta, Total, ID_Venta],
        (error, respuesta) => {
          if (error) {
            res.send('ERROR ACTUALIZANDO COMPRA' + error)
            console.log(error)
          }
          else res.redirect('/ventas')
        }
      );
    }
  };

  exports.ventasDelFormulario = (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
    else
      db.query(
        'SELECT * FROM Venta WHERE ID_Venta=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR al INTENTAR BORRAR LA VENTA')
          else {
            if (respuesta.length > 0) {
              res.render('ventas/del', { ventas: respuesta[0] })
            } else {
              res.send('ERROR al INTENTAR BORRAR LA VENTA, NO EXISTE')
            }
          }
        });
  };
  
  exports.ventasDel = (req, res) => {
  
    const { ID_Venta, Fecha_Venta, Total } = req.body;
    const paramId = req.params['ID_Venta'];
  
    if (isNaN(ID_Venta) || isNaN(paramId) || ID_Venta !== paramId) {
      res.send('ERROR BORRANDO')
    } else {
      db.query(
        'DELETE FROM Venta WHERE ID_Venta=?',
        id,
        (error, respuesta) => {
          if (error) res.send('ERROR BORRANDO VENTA' + req.body)
          else res.redirect('/ventas')
        }
      );
    }
  };