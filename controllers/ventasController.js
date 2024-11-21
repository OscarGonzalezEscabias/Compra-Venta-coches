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
      if (error) res.send('ERROR INSERTANDO CLIENTE' + req.body)
      else res.redirect('/ventas')
    }
  );
};

exports.ventasAddFormulario = (req, res) => {
    res.render('ventas/add');
  };
