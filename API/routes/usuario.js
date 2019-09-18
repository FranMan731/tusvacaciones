'use strict';

var express = require('express');
var Usuario = require('../controllers/usuario');
var md_auth = require('../middlewares/auth.js');

var api = express.Router();

api.post('/registrar', Usuario.registrar);
api.post('/ingresar', Usuario.ingresar);
api.get('/usuario/:id', Usuario.getUsuario);
api.get('/usuario', md_auth.ensureAuthAdmin, Usuario.getUsuarios);
api.put('/actualizar-rol/:id', md_auth.ensureAuthAdmin, Usuario.actualizarRol);
api.delete('/usuario/:id', md_auth.ensureAuthAdmin, Usuario.eliminar);

module.exports = api;