'use strict';

var Caracteristica = require('../models/caracteristica');

//Funcion que crea una caracteristica
async function crearCaracteristica(req, res) {
	//Compruebo que hayan mandado el nombre
	if(req.body.denominacion) {
		//Guardo el atributo

		var caracteristica = {
			"denominacion": String(req.body.denominacion)
		};

		try {
			await Caracteristica.create(caracteristica);

			return res.status(200).send({status: true, message: "Se ha creado satisfactoriamente."});
		} catch(error) {
			return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido crear."});
		}
	} else {
		//En algún campo le falta un valor
        return res.status(200).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
	}
}

//Funcion que obtiene una caracteristica
async function getCaracteristica(req, res) {
	var id = Number.parseInt(req.params.id);

	try {
		var resultado = await Caracteristica.getCaracteristica(id);

		return res.status(200).send({
			status: true,
			resultado
		});
	} catch(error) {
		return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido obtener la información."});
	}
}

//Funcion que obtiene todas las caracteristicas
async function getCaracteristicas(req, res) {
	try {
		var resultado = await Caracteristica.getCaracteristicas();

		return res.status(200).send({
			status: true,
			resultado
		});
	} catch(error) {
		return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido obtener la información."});
	}
}

//Funcion que actualiza una caracteristica
async function actualizar(req, res) {
	//Compruebo que hayan mandado el nombre
	if(req.body.denominacion) {
		//Guardo el atributo
		var caracteristica = {
			"id": Number.parseInt(req.params.id),
			"denominacion": String(req.body.denominacion)
		};

		try {
			await Caracteristica.actualizar(caracteristica);

			return res.status(200).send({status: true, message: "Se ha actualizado satisfactoriamente."});
		} catch(error) {
			return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido actualizar."});
		}
	} else {
		//En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
	}
}

//Funcion que elimina una caracteristica
async function eliminar(req, res) {
	var id = Number.parseInt(req.params.id);

	try {
		await Caracteristica.eliminar(id);

		return res.status(200).send({status: true, message: "Se ha eliminado satisfactoriamente."});
	} catch(error) {
		return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido eliminar."});
	}
}

module.exports = {
	crearCaracteristica,
	getCaracteristica,
	getCaracteristicas,
	actualizar,
	eliminar
}