const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all Producto
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM producto', (err, rows, fields) => {
    if(!err) {
      res.render('home', {rows});
      //res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An Producto
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM producto WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE A Producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM producto WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT A Producto
router.post('/', (req, res) => {
  const {id, producto, descripcion, stock, categoria} = req.body;
  console.log(id, producto, descripcion, stock, categoria);
  const query = "INSERT INTO producto ( id, producto, descripcion, stock, categoria) VALUES (?,?,?,?,?);";
  mysqlConnection.query(query, [id, producto, descripcion, stock, categoria], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Saved'});
    } else {
      console.log(err);
    }
  });

});

//Update producto
router.put('/:id', (req, res) => {
  const {producto, descripcion, stock, categoria } = req.body;
  const { id } = req.params;
  const query = " UPDATE producto SET  producto = ?, descripcion = ?, stock = ?, categoria = ? WHERE id =? ";
  mysqlConnection.query(query, [producto, descripcion, stock, categoria, id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Producto Updated'});
    } else {
      console.log(err);
    }
  });
});

//Hay que exportar el modulo para utilizalo en otras partes de la app
module.exports=router;