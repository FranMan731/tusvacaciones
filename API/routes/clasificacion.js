'use strict'

var express = require('express');
var Clasificacion = require('../controllers/clasificacion');
var md_auth = require('../middlewares/auth.js');

var api = express.Router();

api.post('/clasificacion', md_auth.ensureAuthAdmin, Clasificacion.crearClasificacion);
api.get('/clasificacion/:id', Clasificacion.getClasificacion);
api.get('/clasificacion', Clasificacion.getClasificaciones);
api.get('/clasificacion-total', md_auth.ensureAuthAdmin, Clasificacion.getClasificacionesTotal);
api.put('/clasificacion/:id', md_auth.ensureAuthAdmin, Clasificacion.actualizarClasificacion);
api.delete('/clasificacion/:id', md_auth.ensureAuthAdmin, Clasificacion.deleteClasificacion);
api.put('/clasificacion/:id/reestablecer', md_auth.ensureAuthAdmin, Clasificacion.reestablecerClasificacion);

module.exports = api;