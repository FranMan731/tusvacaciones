'use strict';
const Database = require("../database/database");

//Funcion que crea caracteristica
function create(datos) {
	return new Promise((resolve, reject) => {
		var query = `INSERT INTO caracteristica SET ?;`;

		var dt = {denominacion: datos.denominacion};

		Database.ejecutarQuery(query, dt, (err, result) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

//Funcion que obtiene una caracteristica
function getCaracteristica(id) {
	return new Promise((resolve, reject) => {
		var query = `SELECT * FROM caracteristica WHERE id = ?;`;

		Database.ejecutarQuery(query, id, (err, result) => {
			if(err) return reject(err);

			resolve(result);
		});
	});
}

//Funcion que obtiene todas las caracteristicas
function getCaracteristicas() {
	return new Promise((resolve, reject) => {
		var query = `SELECT * FROM caracteristica;`;

		Database.ejecutarQuery(query, '', (err, result) => {
			if(err) return reject(err);

			resolve(result);
		});
	});
}

//Funcion que actualiza una caracteristica
function actualizar(datos) {
	return new Promise((resolve, reject) => {
		var query = `UPDATE caracteristica SET denominacion = ? WHERE id = ?;`;

		var dt = [datos.denominacion, datos.id];

		Database.ejecutarQuery(query, dt, (err, result) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

//Funcion que elimina una caracteristica
function eliminar(id) {
	return new Promise((resolve, reject) => {
		var query = `DELETE FROM caracteristica WHERE id = ?;`;

		Database.ejecutarQuery(query, id, (err, result) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	create,
	getCaracteristica,
	getCaracteristicas,
	actualizar,
	eliminar
}