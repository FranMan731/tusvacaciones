'use strict';
var Database = require('../database/database.js');

//Funcion que crea un rol
function create(datos) {
	return new Promise((resolve, reject) => {
		Database.query("INSERT INTO rol(nombre) VALUE ('"+datos.nombre+"');", (err, result, fields) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

//Funcion que obtiene todos los roles
function getRoles() {
	return new Promise((resolve, reject) => {
		Database.query("SELECT * FROM rol;", (err, result, fields) => {
			if(err) return reject(err);

			resolve(result);
		});
	});
}

//Funcion que elimina un rol
function eliminar(id) {
	return new Promise((resolve, reject) => {
		Database.query("DELETE FROM rol WHERE id = "+id+";", (err, result, fields) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	create,
	getRoles,
	eliminar
}