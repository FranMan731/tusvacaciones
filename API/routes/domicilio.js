'use strict'

var express = require('express');
var Domicilio = require('../controllers/domicilio');
var md_auth = require('../middlewares/auth.js');

var api = express.Router();

api.put('/domicilio/:id', md_auth.ensureAuthAdmin, Domicilio.actualizar);

module.exports = api;