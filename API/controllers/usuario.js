'use strict';

var Usuario = require('../models/usuario');
// Para encriptar password
var bcrypt = require('bcrypt-nodejs');
// Crea un token
var jwt = require('../services/jwt');

//Funcion que crea un usuario
async function registrar(req, res) {
	if (req.body.email && req.body.password) {

        var usuario = {
            "email": String(req.body.email),
            "password": String(req.body.password)
        };

        try {
        	var resultado = await Usuario.comprobarEmail(usuario);

        	if(resultado.length > 0 && resultado != "No hay registros") {
        		return res.status(200).send({status: false, message: "El email que intentas usar, ya esta registrado."});
        	}
            
            //Cifro la password y envio los datos
			bcrypt.hash(usuario.password, null, null, async (err, hash) => {
				usuario.password = hash;
            	
            	await Usuario.register(usuario);

				var usuarioStored = await Usuario.comprobarEmail(usuario);

				usuarioStored = JSON.stringify(usuarioStored[0]);
				usuarioStored = JSON.parse(usuarioStored);

				usuarioStored.password = undefined;

				try {
					var token = await jwt.createToken(usuarioStored);
				} catch(err) {
					return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido crear." });
				}
				
				var email = usuarioStored.email;

				return res.status(200).send({
					token: token,
					email: email,
					status: true,
					message: "Se ha registrado satisfactoriamente."
				});
        	});
        } catch (error) {
            return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido crear.", error});
        }
    } else {
        //En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
    }
}

//Funcion para ingresar usuario
async function ingresar(req, res) {
	if (req.body.email && req.body.password) {

        var usuario = {
            "email": String(req.body.email),
            "password": String(req.body.password)
        };

        try {
            var resultado = await Usuario.login(usuario);

           	if(resultado.length > 0) {
            	resultado = JSON.stringify(resultado[0]);
            	resultado = JSON.parse(resultado);
            
            	bcrypt.compare(usuario.password, resultado.password, async (err, check) => {
            		if(check) {
						resultado.password = undefined;
						
						var token = await jwt.createToken(resultado);

						return res.status(200).send({
							token: token,
							email: resultado.email,
							status: true
						});
					} else {
						res.status(200).send({status: false});
					}
            	});
            } else {
            	res.status(200).send({status: false});
            }
        } catch (error) {
        	console.log(error);
            return res.status(500).send({ status: false});
        }
    } else {
        //En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
    }
}

//Funcion para obtener un usuario
async function getUsuario(req, res) {
	var id = Number.parseInt(req.params.id);

	try {
		var resultado = await Usuario.getUsuario(id);

		return res.status(200).send({
			status: true,
			resultado
		});
	} catch(error) {
		 return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido obtener la información." });
	}
}

//Funcion que obtiene todos los usuarios
async function getUsuarios(req, res) {
	try {
		var resultado = await Usuario.getUsuarios();

		return res.status(200).send({
			status: true,
			resultado
		});
	} catch(error) {
		 return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido obtener la información." });
	}
}

//Funcion que actualiza el rol del usuario
async function actualizarRol(req, res) {
	if(req.body.fk_rol) {
		var usuario = {
			"id": Number.parseInt(req.params.id),
			"fk_rol": Number.parseInt(req.body.fk_rol)
		};

		try {
			await Usuario.actualizarRol(usuario);

			return res.status(200).send({status: true, message: "Se ha actualizado satisfactoriamente."});
		} catch(error) {
			return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido actualizar el rol." });
		}
	} else {
		//En algún campo le falta un valor
        return res.status(404).send({
            "status": false,
            "message": "Debes enviar todos los campos."
        });
	}
}

//Funcion que elimina un usuario
async function eliminar(req, res) {
	var id = req.params.id;

	try {
		await Usuario.eliminar(id);

		return res.status(200).send({status: true, message: "Se ha eliminado satisfactoriamente."});
	} catch(error) {
		return res.status(500).send({ status: false, message: "Fallo el servidor, no se ha podido eliminar el usuario." });
	}
}

module.exports = {
	registrar,
	ingresar,
	getUsuario,
	getUsuarios,
	actualizarRol,
	eliminar
}