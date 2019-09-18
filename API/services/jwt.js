'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
require('../config/config.js');

var secret = process.env.SECRET_TOKEN;

exports.createToken = function(usuario) {
	var payload = {
		sub: usuario.id,
		email: usuario.email,
		rol: usuario.fk_rol,
		iat: moment().unix,
		exp: moment().add(30, 'days').unix
	};

	return jwt.encode(payload, secret);
};