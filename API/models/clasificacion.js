'use strict';
var moment = require('moment');
var Database = require('../database/database.js');

//Crear una clasificacion
function create(datos) {
	var fecha_alta = moment().format("YYYY-MM-DD HH:mm:ss");

    return new Promise(function(resolve, reject) {
    	var query = `INSERT INTO clasificacion SET ?`;

    	var dt = {
    		nombre: datos.nombre,
    		fecha_alta: fecha_alta,
    		baja: 0
    	};

        Database.ejecutarQuery(query, dt, (err, result) => {
            if (err) return reject(err);

            resolve(true);
        });
    });
}

//Obtiene una clasificacion
function getClasificacion(id) {
	return new Promise(function(resolve, reject) {
		var query = `SELECT * FROM clasificacion WHERE id = ?`;

        Database.ejecutarQuery(query, id, (err, result) => {
            if (err) return reject(err);

            resolve(result);
        });
    });
}

//Obtiene todas las clasificaciones que no estan dadas de baja
function getClasificaciones() {
	return new Promise(function(resolve, reject) {
		var query = `SELECT * FROM clasificacion WHERE baja = 0`;

	    Database.ejecutarQuery(query, '', (err, result) => {
	        if (err) return reject(err);

	        resolve(result);
	    });
	});
}

//Obtiene todas las clasificaciones dado de baja y no dadas de baja.
function getClasificacionesTotal() {
	return new Promise(function(resolve, reject) {
		var query = `SELECT * FROM clasificacion`;

	    Database.ejecutarQuery(query, '', (err, result) => {
	        if (err) return reject(err);

	        resolve(result);
	    });
	});
}

//Actualiza clasificacion
function update(datos) {
    return new Promise(function(resolve, reject) {
    	var query = `UPDATE clasificacion SET nombre = ? WHERE id = ?;`;

    	var dt = [datos.nombre, datos.id];

        Database.ejecutarQuery(query, dt, (err, result) => {
            if (err) return reject(err);

	        resolve(true);
        });
    });
}

//Eliminar clasificacion
function deleteClasificacion(id) {
	var fecha_baja = moment().format("YYYY-MM-DD HH:mm:ss");

	return new Promise(function(resolve, reject) {
		var query = `UPDATE clasificacion SET baja = 1, fecha_baja = ? WHERE id = ?;`;

		var dt = [fecha_baja, id];

	    Database.ejecutarQuery(query, dt, (err, result) => {
	        if (err) return reject(err);

		    resolve(true);
	    });
	});
}

//Reestablece una clasificacion
function reestablecer(id) {
    var fecha_baja = null;

    return new Promise(function(resolve, reject) {
        var query = `UPDATE clasificacion SET baja = 0, fecha_baja = ${fecha_baja} WHERE id = ?;`;

        Database.ejecutarQuery(query, id, (err, result) => {
            if (err) return reject(err);

            resolve(true);
        });
    });
}

module.exports = {
    create,
    getClasificacion,
    getClasificaciones,
    getClasificacionesTotal,
    update,
    deleteClasificacion,
    reestablecer
};