'use strict';
var Database = require('../database/database.js');

//Crea una habitacion
function create(datos) {
	return new Promise((resolve, reject) => {
		Database.query("INSERT INTO habitacion(denominacion, tarifa, hora_ingreso, hora_egreso, cantidad_persona, fk_alojamiento) VALUES ('"+datos.denominacion+"', "+datos.tarifa+", '"+datos.hora_ingreso+"', '"+datos.hora_egreso+"', "+datos.cantidad_persona+", "+datos.fk_alojamiento+");", (err, result, fields) => {
			if (err) return reject(err);

			resolve(true);
		});
	});
}

//Obtiene una habitacion
function getHabitacion(id) {
	return new Promise((resolve, reject) => {
		Database.query("SELECT id, denominacion, tarifa, hora_ingreso, hora_egreso, cantidad_persona FROM habitacion WHERE id = "+id+";", (err, result, fields) => {
			if (err) return reject(err);

			resolve(result);
		})
	});
}

//Obiene todas las habitaciones por hotel
function getHabitacionesPorAlojamiento(fk_alojamiento) {
	return new Promise((resolve, reject) => {
		Database.query("SELECT * FROM habitacion WHERE fk_alojamiento = "+fk_alojamiento+";", (err, result, fields) => {
			if(err) return reject(err);

			resolve(result);
		});
	});
}

//Actualiza una habitacion
function update(datos) {
	return new Promise((resolve, reject) => {
		Database.query("UPDATE habitacion SET denominacion = '"+datos.denominacion+"', tarifa = "+datos.tarifa+", hora_ingreso = '"+datos.hora_ingreso+"', hora_egreso = '"+datos.hora_egreso+"', cantidad_persona = "+datos.cantidad_persona+" WHERE id = "+datos.id+";", (err, result, fields) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

//Eliminar una habitacion
function eliminar(id) {
	return new Promise((resolve, reject) => {
		Database.query("DELETE FROM habitacion WHERE id = "+id+";", (err, result, fields) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	create,
	getHabitacion,
	getHabitacionesPorAlojamiento,
	update,
	eliminar
}