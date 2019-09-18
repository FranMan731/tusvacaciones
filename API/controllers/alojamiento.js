'use strict';

var Alojamiento = require('../models/alojamiento.js');
var Domicilio = require('../models/domicilio.js');
var Unico = require('../models/unico.js');
var Database = require('../database/database');
//Crea Domicilio y luego Alojamiento
async function crearAlojamiento(req, res) {
	//Compruebo que estén todos los campos con valores.
	if(req.body.principal.nombre && req.body.principal.descripcion && req.body.domicilio.calle && req.body.domicilio.numero && req.body.domicilio.ciudad && req.body.domicilio.provincia && req.body.domicilio.cp && req.body.domicilio.pais && req.body.clasificacion.clasificacion && req.body.adicional.tipo && req.body.adicional.hora_ingreso && req.body.adicional.hora_egreso) {

		//Guardo valores de domicilio
		var domicilio = {
			"calle": String(req.body.domicilio.calle),
		    "numero": String(req.body.domicilio.numero),
		    "ciudad": String(req.body.domicilio.ciudad),
		    "provincia": String(req.body.domicilio.provincia),
		    "cp": String(req.body.domicilio.cp),
		    "pais": String(req.body.domicilio.pais),
		    "latitud": 0,
		    "longitud": 0
		};

		//Guardo valores de alojamiento
		var alojamiento;

		if(req.body.clasificacion.clasificacion == 1) {
			alojamiento = {
				"nombre": String(req.body.principal.nombre),
				"descripcion": String(req.body.principal.descripcion),
				"fk_clasificacion": Number.parseInt(req.body.clasificacion.clasificacion),
				"categoria": String(req.body.clasificacion.categoria),
				"hora_ingreso": String(req.body.adicional.hora_ingreso),
				"hora_egreso": String(req.body.adicional.hora_egreso),
				"tipo": Number.parseInt(req.body.adicional.tipo)
			};
		} else {
			alojamiento = {
				"nombre": String(req.body.principal.nombre),
				"descripcion": String(req.body.principal.descripcion),
				"fk_clasificacion": Number.parseInt(req.body.clasificacion.clasificacion),
				"hora_ingreso": String(req.body.adicional.hora_ingreso),
				"hora_egreso": String(req.body.adicional.hora_egreso),
				"tipo": Number.parseInt(req.body.adicional.tipo)
			};
		}

		try {
			Database.iniciarTransaction();

			await Alojamiento.create(alojamiento);
			await Domicilio.create(domicilio);

			if(req.body.adicional.tipo == 0) {
				var unico = {
					"cantidad_habitacion": Number.parseInt(req.body.unico.cant_habitacion),
					"tarifa": Number.parseInt(req.body.unico.tarifa),
					"cantidad_persona": Number.parseInt(req.body.unico.cant_persona)
				};

				await Unico.create(unico);
			}

			Database.confirmarTransaction();

			return res.status(200).send({status: true, message: "Se ha creado satisfactoriamente."});
		} catch(error) {
			console.error(error);
			Database.rollbackTransaction();
			
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

//Obtiene alojamientos
async function getAlojamientos(req, res) {
	/*
	* La variable tipo, es el valor de que tipo de alojamientes necesita devolver.
	*	Tipo: 0 -> Todos los alojamientos que no están dado de baja.
	*		  1 -> Todos los alojamientos que han sido dado de baja.
	*		  2 -> Todos los alojamientos sin importar si ha sido o no dado de baja.
	*/
	if(req.params.tipo >= 0 && req.params.tipo < 3) {
		var tipo = Number.parseInt(req.params.tipo);

		try {
			switch(tipo) {
				case 0:
					var resultado = await Alojamiento.getAlojamientosNoBaja();
					break;
				case 1:
					var resultado = await Alojamiento.getAlojamientosBaja();
					break;
				case 2:
					var resultado = await Alojamiento.getAlojamientos();
					break;
				default:
					break;
			}

			return res.status(200).send({
				"status": true,
				resultado
			});
		} catch(error) {
			console.error(error);
			return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido obtener la información."});
		}

	} else {
		return res.status(404).send({
			"status": false,
			"message": "El tipo de búsqueda es incorrecta."
		});
	}
}

//Obtiene un alojamiento
async function getAlojamiento(req, res) {
	//Verifico si manda id del alojamiento
	if(req.params.id) {
		var id = Number.parseInt(req.params.id);

		try {
			var resultado = await Alojamiento.getAlojamiento(id);

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
			"message": "Debe enviar el id del alojamiento."
		});
	}
}

//Actualiza Alojamiento
async function actualizarAlojamiento(req, res) {
	//Compruebo que estén todos los campos con valores.
	console.log(req.params.id);
	console.log(req.body);
	if(req.params.id && req.body.nombre && req.body.descripcion && req.body.fk_clasificacion) {

		//Guardo valores de alojamiento
		var alojamiento = {
			"id": Number.parseInt(req.params.id),
			"nombre": String(req.body.nombre),
			"descripcion": String(req.body.descripcion),
			"fk_clasificacion": Number.parseInt(req.body.fk_clasificacion),
			"categoria": String(req.body.categoria)
		};

		//Actualizo
		try {
			await Alojamiento.update(alojamiento);

			return res.status(200).send({status: true, message: "Se ha actualizado satisfactoriamente."});
		} catch(error) {
			console.error(error);
			return res.status(500).send({status: false, message: "Fallo el servidor, no se ha podido actualizar."});
		}
	} else {
		//En algún campo le falta un valor
		return res.status(200).send({
			"status": false,
			"message": "Debes enviar todos los campos."
		});
	}
}

//Eliminar un Alojamiento
async function eliminarAlojamiento(req, res) {
	var id = req.params.id;

	try {
		var fk_domicilio = await Alojamiento.getFkDomicilio(id);

		await Domicilio.deleteDomicilio(fk_domicilio);
		await Alojamiento.deleteAlojamiento(id);

		return res.status(200).send({status: true, message: "Se ha eliminado satisfactoriamente"});
	} catch(error) {
		return res.status(500).send({
			"status": false,
			"message": "Fallo el servidor, no se ha podido eliminar la información."
		});
	}
}

module.exports = {
	crearAlojamiento,
	getAlojamiento,
	getAlojamientos,
	actualizarAlojamiento,
	eliminarAlojamiento
};