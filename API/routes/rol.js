'use strict';

var express = require('express');
var Rol = require('../controllers/rol');

var api = express.Router();

api.post('/rol', Rol.crearRol);
api.get('/rol', Rol.getRoles);
api.delete('/rol/:id', Rol.eliminar);

module.exports = api;