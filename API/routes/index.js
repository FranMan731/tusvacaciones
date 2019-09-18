'use strict'

var express = require('express');
var router = express();

var alojamiento_routes = require('./alojamiento.js');
var domicilio_routes = require('./domicilio.js');
var clasificacion_routes = require('./clasificacion.js');
var habitacion_routes = require('./habitacion.js');
var caracteristica_routes = require('./caracteristica.js');
var rol_routes = require('./rol.js');
var usuario_routes = require('./usuario.js');

router.use('/api/v1', alojamiento_routes);
router.use('/api/v1', domicilio_routes);
router.use('/api/v1', clasificacion_routes);
router.use('/api/v1', habitacion_routes);
router.use('/api/v1', caracteristica_routes);
router.use('/api/v1', rol_routes);
router.use('/api/v1', usuario_routes);

module.exports = router;