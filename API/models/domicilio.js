'use strict';
var Database = require('../database/database.js');

//Crea un domicilio
 function create(datos) {
	//Hago la consulta
	return new Promise(function(resolve, reject) {
		var query = `INSERT INTO domicilio SET ?`;
		var dt = {
			"calle": datos.calle,
			"numero": datos.numero,
			"ciudad": datos.ciudad,
			"provincia": datos.provincia,
			"cp": datos.cp,
			"pais": datos.pais,
			"latitud": datos.latitud,
			"longitud": datos.longitud
		};

		Database.ejecutarQuery(query, dt, (err, result) => {
			if (err) return reject(err);

			//Selecciono el último ID ingresado
			resolve(true);
		});
	});
}

//Actualiza un domicilio
function update(datos) {
	return new Promise((resolve, reject) => {
		var query = `UPDATE domicilio SET calle = ?, numero = ?, ciudad = ?, provincia = ?, cp = ?, pais = ?, latitud = ?, longitud = ? WHERE id = ?`;

		var dt = [datos.calle, datos.numero, datos.ciudad, datos.provincia, datos.cp, datos.pais, datos.latitud, datos.longitud, datos.id]

		Database.ejecutarQuery(query, dt, (err, result) => {
			if (err) return reject(err);

			resolve(true);
		});
	});
}

//Elimina un domicilio
function deleteDomicilio(id) {
	return new Promise((resolve, reject) => {
		var query = `UPDATE alojamiento SET baja = 1 WHERE id = ?`;
		Database.ejecutarQuery(query, id, (err, result) => {
			if (err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	create,
	update,
	deleteDomicilio
};