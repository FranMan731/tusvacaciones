'use strict';
var moment = require('moment');
var Database = require('../database/database.js');

//Crea alojamientos
function create(datos) {
	var fecha_alta = moment().format("YYYY-MM-DD HH:mm:ss");

	return new Promise(function(resolve, reject) {
		var query = `INSERT INTO alojamiento SET ?`;
		var dt;
		if(datos.categoria) {
			dt = {
				"nombre": datos.nombre,
				"descripcion": datos.descripcion,
				"fecha_alta": fecha_alta,
				"fecha_baja": null,
				"fk_clasificacion": datos.fk_clasificacion,
				"baja": 0,
				"categoria": datos.categoria,
				"hora_ingreso": datos.hora_ingreso,
				"hora_egreso": datos.hora_egreso,
				"tipo": datos.tipo
			};
		} else {
			dt = {
				"nombre": datos.nombre,
				"descripcion": datos.descripcion,
				"fecha_alta": fecha_alta,
				"fecha_baja": null,
				"fk_clasificacion": datos.fk_clasificacion,
				"baja": 0,
				"categoria": null,
				"hora_ingreso": datos.hora_ingreso,
				"hora_egreso": datos.hora_egreso,
				"tipo": datos.tipo
			};
		}
		

		Database.ejecutarQuery(query, dt, (err, result) => {
			if (err) return reject(err);

			resolve(true);
		});
	});
}

//Obtiene todos los alojamientos
function getAlojamientos() {
	return new Promise(function(resolve, reject) {
		var query = `SELECT a.id, a.nombre, a.descripcion, a.fecha_alta, a.fk_clasificacion, c.nombre as clasificacion_nombre, d.calle, d.numero, d.ciudad, d.provincia, d.cp, d.pais, d.latitud, d.longitud FROM alojamiento a LEFT JOIN domicilio d ON a.id = d.id LEFT JOIN clasificacion c ON a.fk_clasificacion = c.id;`;

		Database.ejecutarQuery(query, '', (err, result) => {
			if (err) return reject(err);

			resolve(result);
		});
	});
}

//Obtiene todos los alojamientos que no han sido dado de baja
function getAlojamientosNoBaja() {
	return new Promise((resolve, reject) => {
		var query = `SELECT a.id, a.nombre, a.descripcion, a.fecha_alta, a.fk_clasificacion, c.nombre as clasificacion_nombre, d.calle, d.numero, d.ciudad, d.provincia, d.cp, d.pais, d.latitud, d.longitud FROM alojamiento a LEFT JOIN domicilio d ON a.id = d.id LEFT JOIN clasificacion c ON a.fk_clasificacion = c.id WHERE a.baja = 0`;

		Database.ejecutarQuery(query, '', (err, result) => {
			if (err) return reject(err);

			resolve(result);
		});
	});
}

//Obtiene todos los alojamientos que han sido dado de baja
function getAlojamientosBaja() {
	return new Promise((resolve, reject) => {
		var query = `SELECT a.id, a.nombre, a.descripcion, a.fecha_alta, a.fk_clasificacion, c.nombre as clasificacion_nombre, d.calle, d.numero, d.ciudad, d.provincia, d.cp, d.pais, d.latitud, d.longitud FROM alojamiento a LEFT JOIN domicilio d ON a.id = d.id LEFT JOIN clasificacion c ON a.fk_clasificacion = c.id WHERE a.baja = 1`;

		Database.ejecutarQuery(query, '', (err, result) => {
			if (err) return reject(err);

			resolve(result);
		});
	});
}

//Obtiene un solo alojamiento
function getAlojamiento(id) {

	return new Promise((resolve, reject) => {
		var query = `SELECT a.nombre, a.descripcion, a.fecha_alta, a.fecha_baja, a.baja, a.fk_clasificacion, c.nombre as clasificacion_nombre, d.calle, d.numero, d.provincia, d.latitud, d.longitud FROM alojamiento a LEFT JOIN domicilio d ON a.id = d.id LEFT JOIN clasificacion c ON a.fk_clasificacion = c.id WHERE a.id = ? LIMIT 0,1;`;

		Database.ejecutarQuery(query, id, (err, result) => {
				if (err) return reject(err);

				resolve(result);
	        });
	});
}

//Obtiene todos los alojamientos que tengan el fk_clasificacion
function getAlojamientosFkClasificacion(id) {
	return new Promise((resolve, reject) => {
		var query = `SELECT COUNT(*) AS total FROM alojamiento WHERE fk_clasificacion = ?`;

		Database.ejecutarQuery(query, id, (err, result) => {
			if (err) return reject(err);

			resolve(result);
		});
	})
}

//Obtiene el fk_domicilio del alojamiento
function getFkDomicilio(id) {
	return new Promise((resolve, reject) => {
		var query = `SELECT fk_domicilio FROM alojamiento WHERE id = ?;`;

		Database.ejecutarQuery(query, id, (err, result) => {
			if (err) return reject(err);

			resolve(result);
		});
	});
 }

//Actualiza un alojamiento
function update(datos) {
	return new Promise((resolve, reject) => {
		var query = `UPDATE alojamiento SET nombre = ?, descripcion = ?, fk_clasificacion = ?, categoria = ? WHERE id = ?;`;

		var dt = [datos.nombre, datos.descripcion, datos.fk_clasificacion, datos.categoria, datos.id];

		Database.ejecutarQuery(query, dt, (err, result) => {
				if (err) return reject(err);

				resolve(true);
			});
	});
}

//Elimina un alojamiento
function deleteAlojamiento(id) {
	var fecha_baja = moment().format("YYYY-MM-DD HH:mm:ss");

	return new Promise((resolve, reject) => {
		var query = `UPDATE alojamiento SET baja = 1, fecha_baja = ${fecha_baja} WHERE id = ?;`;

		Database.ejecutarQuery(query, id,(err, result) => {
			if (err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	create,
	getAlojamientos,
	getAlojamientosNoBaja,
	getAlojamientosBaja,
	getAlojamiento,
	getAlojamientosFkClasificacion,
	update,
	getFkDomicilio,
	deleteAlojamiento
};