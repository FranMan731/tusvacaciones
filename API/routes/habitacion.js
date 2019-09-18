'use strict'

var express = require('express');
var Habitacion = require('../controllers/habitacion');

var api = express.Router();

api.post('/habitacion', Habitacion.crearHabitacion);
api.get('/habitacion/:id', Habitacion.getHabitacion);
api.get('/habitacion-alojamiento/:id', Habitacion.getHabitacionesPorAlojamiento);
api.put('/habitacion/:id', Habitacion.actualizarHabitacion);
api.delete('/habitacion/:id', Habitacion.eliminarHabitacion);

module.exports = api;