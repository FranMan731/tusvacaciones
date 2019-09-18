'use strict';

var Rol = require('../models/rol');

//Funcion que crea un rol
async function crearRol(req, res) {
	//Compruebo que hayan mandado el nombre
	if(req.body.nombre) {
		//Guardo el atributo
		var rol = {
			"nombre": String(req.body.nombre)
		};

		try {
			await Rol.create(rol);

			return res.status(200).send({status: true, message: "Se ha creado satisfactoriamente."});
		} catch(error) {
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

//Funcion que obtiene todos los roles
async function getRoles(req, res) {
	try {
		var resultado = await Rol.getRoles();

		return res.status(200).send({
			status: true,
			resultado
		});
	} catch(error) {
		return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido obtener la información."});
	}
}

//Funcion que elimina un rol
async function eliminar(req, res) {
	var id = Number.parseInt(req.params.id);

	try {
		await Rol.eliminar(id);

		return res.status(200).send({status: true, message: "Se ha eliminado satisfactoriamente."});
	} catch(error) {
		return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido eliminar."});
	}
}

module.exports = {
	crearRol,
	getRoles,
	eliminar
}