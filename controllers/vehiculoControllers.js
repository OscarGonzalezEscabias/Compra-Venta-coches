const db = require('../db')

exports.vehiculos = (req, res) => {
    db.query(
      'SELECT * FROM `Vehiculo`',
      (err, response) => {
        if (err) res.send('ERROR al hacer la consulta')
        else res.render('vehiculos/list', { vehiculos: response })
      }
    );
  };

  exports.vehiculoAdd = (req, res) => {
    const { marca,modelo,año,precio,combustible } = req.body;
    db.query(
      'INSERT INTO vehiculo (marca,modelo,año,precio,combustible) VALUES (?,?,?,?,?)',
      [marca,modelo,año,precio,combustible],
      (error, respuesta) => {
        if (error) res.send('ERROR INSERTANDO vehiculo' + req.body)
        else res.redirect('/vehiculos')
      }
    );
  };
  
  exports.vehiculoAddFormulario = (req, res) => {
    res.render('vehiculos/add');
  };