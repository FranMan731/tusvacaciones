'use strict';

var Habitacion = require('../models/habitacion');
var HabitacionCaracteristica = require('../models/alojamiento-caracteristica.js');

//Crea una habitacion
async function crearHabitacion(req, res) {
    if (req.body.denominacion && req.body.tarifa && req.body.hora_ingreso && req.body.hora_egreso && req.body.cantidad_persona && req.body.fk_alojamiento && req.body.caracteristicas) {
        var fk_alojamiento = Number.parseInt(req.body.fk_alojamiento);

        var habitacion = {
            "denominacion": String(req.body.denominacion),
            "tarifa": Number.parseFloat(req.body.tarifa),
            "hora_ingreso": String(req.body.hora_ingreso),
            "hora_egreso": String(req.body.hora_egreso),
            "cantidad_persona": Number.parseInt(req.body.cantidad_persona),
            "fk_alojamiento": fk_alojamiento
        };

        var habitacioncaracteristica = req.body.caracteristicas;

        try {
            await Habitacion.create(habitacion);

            return res.status(200).send({ status: true, message: "Se ha creado satisfactoriamente." });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido crear." });
        }
    } else {
        //En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
    }
}

//Obtener una habitacion
async function getHabitacion(req, res) {
    var id = req.params.id;

    try {
        var resultado = await Habitacion.getHabitacion(id);

        return res.status(200).send({
            "status": true,
            resultado
        });
    } catch (error) {
        return res.status(500).send({
            "status": false,
            "message": "Fallo el servidor, no se ha podido obtener la información."
        });
    }
}

//Obtiene todas las habitaciones de un alojamiento
async function getHabitacionesPorAlojamiento(req, res) {
		var fk_alojamiento = Number.parseInt(req.params.id);

	try {
		var resultado = await Habitacion.getHabitacionesPorAlojamiento(fk_alojamiento);

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

//Actualiza una habitacion
async function actualizarHabitacion(req, res) {
	if (req.body.denominacion && req.body.tarifa && req.body.hora_ingreso && req.body.hora_egreso && req.body.cantidad_persona) {
		
		var id = req.params.id;

        var habitacion = {
        	"id": Number.parseInt(id),
            "denominacion": String(req.body.denominacion),
            "tarifa": Number.parseFloat(req.body.tarifa),
            "hora_ingreso": String(req.body.hora_ingreso),
            "hora_egreso": String(req.body.hora_egreso),
            "cantidad_persona": Number.parseInt(req.body.cantidad_persona)
        };

        try {
            await Habitacion.update(habitacion);

            return res.status(200).send({ status: true, message: "Se ha actualizado satisfactoriamente." });
        } catch (error) {
            return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido actualizar." });
        }
    } else {
        //En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
    }
}

//Borra la habitacion
async function eliminarHabitacion(req, res) {
	var id = req.params.id;

	try {
		await Habitacion.eliminar(id);

		return res.status(200).send({status: true, message: "Se ha eliminado satisfactoriamente."})
	} catch(error) {
		return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido eliminar." });
	}
}

module.exports = {
    crearHabitacion,
    getHabitacion,
    getHabitacionesPorAlojamiento,
    actualizarHabitacion,
    eliminarHabitacion
}