'use strict';
var moment = require('moment');
var Database = require('../database/database.js');

//Crea alojamientos
function create(datos) {
	return new Promise(function(resolve, reject) {
		var query = `INSERT INTO unico SET ?`;
		var dt = {
			"cantidad_habitacion": datos.cantidad_habitacion,
			"tarifa": datos.tarifa,
			"cantidad_persona": datos.cantidad_persona
		};

		Database.ejecutarQuery(query, dt, (err, result) => {
			if (err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	create
}