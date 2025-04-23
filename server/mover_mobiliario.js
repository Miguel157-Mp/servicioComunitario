const express = require('express');
const pool = require('../database/db');
const router = express.Router();
router.get('/salones', async (req, res) => {
    try {
      const result = await pool.query('SELECT "idSalon", piso, modulo, capacidad, status, "tipoDeSalon" FROM public.salon');
      
      res.json(result.rows); // Devuelve los datos como JSON
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al obtener los salones');
    }
  });
  
  module.exports = router;