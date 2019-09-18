"use strict";
const Database = require("../database/database");

//Funcion que crea un usuario
function register(datos) {
	return new Promise((resolve, reject) => {
		var query = `INSERT INTO usuario SET ?`;
		
		var dt = {email: datos.email, password: datos.password, fk_rol: 2};

		Database.ejecutarQuery(query, dt, (err, results) => {
			if(err) return reject(err);

			resolve(true);
		})
	});
}

//Funcion que comprueba si el email existe
function comprobarEmail(datos) {
	return new Promise((resolve, reject) => {
		var query = `SELECT * FROM usuario WHERE email = ?;`;

		Database.ejecutarQuery(query, datos.email, (err, results) => {
			if(err) return reject(err);

			resolve(results);
		});
	});
}

//Funcion que ingresa a usuario
function login(datos) {
	return new Promise((resolve, reject) => {
		var query = `SELECT * FROM usuario WHERE email = ? LIMIT 0,1;`;
		
		Database.ejecutarQuery(query, datos.email, (err, results) => {
			if(err) return reject(err);

			resolve(results);
		});
	});
}

//Funcion que obtiene un usuario
function getUsuario(id) {
	return new Promise((resolve, reject) => {
		var query = `SELECT u.id, u.email, r.nombre as rol FROM usuario u LEFT JOIN rol r ON u.fk_rol = r.id WHERE u.id = ? LIMIT 0,1;`;
		Database.ejecutarQuery(query, id, (err, results) => {
			if(err) return reject(err);

			resolve(results);
		});
	});
}

//Funcion que obtiene todos los usuarios
function getUsuarios() {
	return new Promise((resolve, reject) => {
		var query = `SELECT u.id, u.email, r.nombre as rol FROM usuario u LEFT JOIN rol r ON u.fk_rol = r.id;`;

		Database.ejecutarQuery(query, '',(err, results) => {
			if(err) return reject(err);

			resolve(results);
		});
	});
}

//Funcion que actualiza rol de usuario
function actualizarRol(datos) {
	return new Promise((resolve, reject) => {
		var query = 'UPDATE usuario SET fk_rol = ? WHERE id = ?;';

		var dt = [datos.fk_rol, datos.id];

		Database.ejecutarQuery(query, dt, (err, results) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

//Funcion que elimina un usuario
function eliminar(id) {
	return new Promise((resolve, reject) => {
		var query = `DELETE FROM usuario WHERE id = ?;`;

		Database.ejecutarQuery(query, id, (err, results) => {
			if(err) return reject(err);

			resolve(true);
		});
	});
}

module.exports = {
	register,
	comprobarEmail,
	login,
	getUsuario,
	getUsuarios,
	actualizarRol,
	eliminar
}