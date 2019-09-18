'use strict';
var Database = require('../database/database.js');

//Funcion que ingresa caracteristica de una habitacion
function ingresar(datos) {
	return new Promise((resolve, reject) => {
		var query = `INSERT INTO alojamientocaracteristica SET ?`;
		var dt = {};

		dt = datos.map(dato, i => {
			return {
					"fk_alojamiento": datos[i].fk_alojamiento,
					"fk_caracteristica": datos[i].fk_caracteristica
				};
		});

		Database.query(query, dt, (err, result) => {
			if(err) return reject(err);
			
			resolve(true);
		});
	});
}

module.exports = {
	ingresar
}