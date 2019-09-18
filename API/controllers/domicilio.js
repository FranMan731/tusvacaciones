'use strict';

var Domicilio = require('../models/domicilio.js');

//Funcion que actualiza una direccion
async function actualizar(req, res) {
	if(req.body.calle && req.body.numero && req.body.ciudad && req.body.provincia && req.body.cp && req.body.pais && req.body.latitud && req.body.longitud) {
	    //Guardo valores de domicilio
	    var domicilio = {
	        "id": Number.parseInt(req.params.id),
	        "calle": String(req.body.calle),
	        "numero": String(req.body.numero),
	        "ciudad": String(req.body.ciudad),
	        "provincia": String(req.body.provincia),
	        "cp": String(req.body.cp),
	        "pais": String(req.body.pais),
	        "latitud": Number.parseFloat(req.body.latitud),
	        "longitud": Number.parseFloat(req.body.longitud)
	    };

	    try {
	        await Domicilio.update(domicilio);

	        return res.status(200).send({ status: true, message: "Se ha actualizado satisfactoriamente." });
	    } catch (error) {
	        console.error(error);
	        return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido actualizar." });
	    }
	} else {
		//En algún campo le falta un valor
		return res.status(200).send({
			"status": false,
			"message": "Debes enviar todos los campos."
		});
	}
}

module.exports = {
	actualizar
}