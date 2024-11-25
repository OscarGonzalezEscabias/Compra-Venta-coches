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
    'INSERT INTO Vehiculo (marca,modelo,anno,precio,combustible) VALUES (?,?,?,?,?)',
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
exports.vehiculoEditFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM Vehiculo WHERE ID_Vehiculo=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR ACTUALIZAR EL Vehiculo')
        else {
          if (respuesta.length > 0) {
            res.render('vehiculos/edit', { vehiculo : respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR ACTUALIZAR EL Vehiculo, NO EXISTE')
          }
        }
      });
};

exports.vehiculoEdit = (req, res) => {
  const { id, marca , modelo , anno , precio , combustible } = req.body; 
  const paramId = req.params['id']; 

  if (isNaN(id) || isNaN(paramId) || parseInt(id) !== parseInt(paramId)) {
    return res.send('ERROR: Datos inválidos.');
  }

  db.query(
    'UPDATE Vehiculo SET Marca = ?, Modelo = ?, Anno = ? , Precio = ? , Combustible = ? WHERE ID_Vehiculo = ?',
    [marca , modelo , anno , precio , combustible, id],
    (error, respuesta) => {
      if (error) {
        console.error('Error al actualizar vehiculo:', error);
        return res.send('Error actualizando vehiculo.');
      }
      res.redirect('/vehiculos');
    }
  );
};
exports.vehiculoDelFormulario = (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) res.send('PARAMETROS INCORRECTOS')
  else
    db.query(
      'SELECT * FROM Vehiculo WHERE ID_Vehiculo=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR al INTENTAR BORRAR EL Vehiculo')
        else {
          if (respuesta.length > 0) {
            res.render('vehiculos/del', { vehiculo : respuesta[0] })
          } else {
            res.send('ERROR al INTENTAR BORRAR EL Vehiculo, NO EXISTE')
          }
        }
      });

};

exports.vehiculoDel = (req, res) => {

  const { id } = req.body;
  const paramId = req.params['id'];

  if (isNaN(id) || isNaN(paramId) || id !== paramId) {
    res.send('ERROR BORRANDO')
  } else {
    db.query(
      'DELETE FROM Vehiculo WHERE ID_Vehiculo=?',
      id,
      (error, respuesta) => {
        if (error) res.send('ERROR BORRANDO Vehiculo' + req.body)
        else res.redirect('/vehiculos')
      }
    );
  }
};

// Cargar la vista inicial con todas las marcas
exports.vehiculosMarcas = (req, res) => {
  db.query('SELECT DISTINCT Marca FROM Vehiculo', (error, marcas) => {
      if (error) {
          res.send('Error obteniendo las marcas');
      } else {
          res.render('vehiculos/marcas', { marcas: marcas.map(m => m.Marca), vehiculos: [] });
      }
  });
};

// Filtrar los vehículos por marca
exports.filtrarVehiculosPorMarca = (req, res) => {
  const { marca } = req.body;

  db.query('SELECT DISTINCT Marca FROM Vehiculo', (error, marcas) => {
      if (error) {
          res.send('Error obteniendo las marcas');
      } else {
          const marcasUnicas = marcas.map(m => m.Marca);
          if (!marca || !marcasUnicas.includes(marca)) {
              res.render('vehiculos/marcas', { marcas: marcasUnicas, vehiculos: [] });
          } else {
              db.query('SELECT * FROM Vehiculo WHERE Marca = ?', [marca], (error, vehiculos) => {
                  if (error) {
                      res.send('Error filtrando los vehículos');
                  } else {
                      res.render('vehiculos/marcas', { marcas: marcasUnicas, vehiculos });
                  }
              });
          }
      }
  });
};