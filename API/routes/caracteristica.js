'use strict';

var express = require('express');
var Caracteristica = require('../controllers/caracteristica');
var md_auth = require('../middlewares/auth.js');

var api = express.Router();

api.post('/caracteristica', md_auth.ensureAuthAdmin, Caracteristica.crearCaracteristica);
api.get('/caracteristica/:id', md_auth.ensureAuthAdmin, Caracteristica.getCaracteristica);
api.get('/caracteristica', md_auth.ensureAuthAdmin, Caracteristica.getCaracteristicas);
api.put('/caracteristica/:id', md_auth.ensureAuthAdmin, Caracteristica.actualizar);
api.delete('/caracteristica/:id', md_auth.ensureAuthAdmin, Caracteristica.eliminar);

module.exports = api;