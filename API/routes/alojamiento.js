'use strict'

var express = require('express');
var Alojamiento = require('../controllers/alojamiento');
var md_auth = require('../middlewares/auth.js');

var api = express.Router();

api.post('/alojamiento', md_auth.ensureAuthAdmin, Alojamiento.crearAlojamiento);
api.get('/alojamientos/:tipo', Alojamiento.getAlojamientos);
api.get('/alojamiento/:id', Alojamiento.getAlojamiento);
api.put('/alojamiento/:id', md_auth.ensureAuthAdmin, Alojamiento.actualizarAlojamiento);
api.delete('/alojamiento/:id', md_auth.ensureAuthAdmin, Alojamiento.eliminarAlojamiento);


module.exports = api;