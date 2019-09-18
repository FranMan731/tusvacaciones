'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
require('../config/config.js');

var secret = process.env.SECRET_TOKEN;

exports.ensureAuthAdmin = function(req, res, next) {
	if(!req.headers.authorization) {
		return res.status(403).send({message: "La petición no tiene la cabecera de autenticación"});
	}

	var token = req.headers.authorization.replace(/['"]+/g, '');

	try {
		var payload = jwt.decode(token, secret);

		if(payload.exp <= moment().unix) {
			return res.status(401).send({
				message: "El token ha expirado"
			});
		}

		if(payload.rol !== 1) {
			return res.status(401).send({
				message: "No tienes autorización para hacer la siguiente tarea."
			});
		}
	} catch(e) {
		return res.status(404).send({
				message: "El token no es válido"
			});
	}

	req.usuario = payload;

	next();
}