'use strict';

var Clasificacion = require('../models/clasificacion.js');
var Alojamiento = require('../models/alojamiento.js');
var Database = require('../database/database');

//Crea una clasificacion
async function crearClasificacion(req, res) {
	//Compruebo que hayan mandado el nombre
	if(req.body.nombre) {
		var nombre = req.body.nombre;

		//Guardo el atributo
		var clasificacion = {
			"nombre": String(nombre)
		};

		try {
			await Clasificacion.create(clasificacion);

			return res.status(200).send({status: true, message: "Se ha creado satisfactoriamente."});
		} catch(error) {
			console.log(error);

			return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido crear."});
		}
	} else {
		//En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
	}
}

//Obtiene una clasificacion
async function getClasificacion(req, res) {
	//Verifico si manda id de la clasificacion
	if(req.params.id) {
		var id = Number.parseInt(req.params.id);

		try {
			var resultado = await Clasificacion.getClasificacion(id);

			return res.status(200).send({
				"status": true,
				resultado
			});
		} catch(error) {
			return res.status(500).send({
				"status": false,
				"message": "Fallo el servidor, no se ha podido obtener la información."
			});
		}
	} else {
		return res.status(404).send({
			"status": false,
			"message": "Debe enviar el id de la clasificación."
		});
	}
}

//Obtiene todas las clasificaciones no dada de baja
async function getClasificaciones(req, res) {
	try {
		var resultado = await Clasificacion.getClasificaciones();

		return res.status(200).send({
			"status": true,
			resultado
		});
	} catch(err) {
		console.log(err);
		return res.status(500).send({
			"status": false,
			"message": "Fallo el servidor, no se ha podido obtener la información."
		});
	}
}

//Obtiene todas las clasificaciones en total (dadas de baja o no)
async function getClasificacionesTotal(req, res) {
	try {
		var resultado = await Clasificacion.getClasificacionesTotal();

		return res.status(200).send({
			"status": true,
			resultado
		});
	} catch(error) {
		return res.status(500).send({
			"status": false,
			"message": "Fallo el servidor, no se ha podido obtener la información."
		});
	}
}

//Actualizar una clasificacion
async function actualizarClasificacion(req, res) {
	if(req.body.nombre) {
    	var clasificacion = {
    		"id": Number.parseInt(req.params.id),
    		"nombre": String(req.body.nombre)
    	};

    	try {
    		await Clasificacion.update(clasificacion);

    		return res.status(200).send({status: true, message: "Se ha actualizado satisfactoriamente"});
    	} catch(error) {
    		return res.status(500).send({
				"status": false,
				"message": "Fallo el servidor, no se ha podido actualizar la información."
			});
    	}
	}
}

//Eliminar clasificacion
async function deleteClasificacion(req, res) {
	var id = req.params.id;

	try {
		var resultado = await Alojamiento.getAlojamientosFkClasificacion(id);

		resultado = JSON.stringify(resultado[0]);
		resultado = JSON.parse(resultado);

		if(resultado.total > 1) {
			return res.status(200).send({status: false, message: `No se puede dar de baja, ya que deberá eliminar primero los ${resultado.total} alojamientos que tienen esta clasificación.`});
		} else if(resultado.total === 1) {
			return res.status(200).send({status: false, message: `No se puede dar de baja, ya que deberá eliminar primero el alojamiento que tiene esta clasificación.`});
		} else {
			await Clasificacion.deleteClasificacion(id);

			return res.status(200).send({status: true, message: "Se ha dado de baja satisfactoriamente"});
		}
	} catch(error) {
		return res.status(500).send({
			"status": false,
			"message": "Fallo el servidor, no se ha podido eliminar la información."
		});
	}
}

async function reestablecerClasificacion(req, res) {
	var id = req.params.id;

	try {
    	await Clasificacion.reestablecer(id);

    	return res.status(200).send({status: true, message: "Se ha reestablecido satisfactoriamente"});
    } catch(error) {
    	return res.status(500).send({
			"status": false,
			"message": "Fallo el servidor, no se ha podido reestablecer la clasificación."
		});
    }
}

module.exports = {
	crearClasificacion,
	getClasificacion,
	getClasificaciones,
	getClasificacionesTotal,
	actualizarClasificacion,
	deleteClasificacion,
	reestablecerClasificacion
}