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
      if (error) res.send('ERROR INSERTANDO CLIENTE' + req.body)
      else res.redirect('/compras')
    }
  );
};

exports.comprasAddFormulario = (req, res) => {
    res.render('compras/add');
  };
