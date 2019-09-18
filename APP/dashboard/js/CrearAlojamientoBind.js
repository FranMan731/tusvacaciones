$(function() {
	"use strict";

	var funcionCrearAlojamiento = {};

	(function(app) {
		app.prototype = new Alojamiento();

		app.init = function() {
			app.prototype.getClasificaciones(0);
			app.formStep();
			app.bindings();
		};

		app.formStep = function() {
			var divSteps = $("#stepsCrearAlojamiento");

			divSteps.steps({
				headerTag: "h3",
				bodyTag: "fieldset",
				transitionEffect: "fade",
				titleTemplate: '#title#',
				labels: {
					finish: "Finalizar",
					next: "Siguiente",
					previous: "Anterior",
				},
				onStepChanging: function (event, currentIndex, newIndex) {
					if(currentIndex > newIndex) {
						return true;
					}

					if(newIndex === 1) {
						var datos = {
							"principal": {
								"nombre": $("#txtNombre").val(),
								"descripcion": $("#txtDescripcion").val()
							},
							"domicilio": {
								"calle": $("#txtCalle").val(),
								"numero": $("#txtNumero").val(),
								"cp": $("#txtCP").val(),
								"ciudad": $("#txtCiudad").val(),
								"provincia": $("#txtProvincia").val(),
								"pais": $("#txtPais").val()
							},
							"clasificacion": {
								"clasificacion": $("#slcClasificacion option:selected").val(),
								"categoria": $("#slcCategoria option:selected").val()
							},
							"adicional": {
								"tipo": $("#slcTipoAlquiler option:selected").val(),
								"hora_ingreso": $("#txtHoraIngreso").val(),
								"hora_egreso": $("#txtHoraEgreso").val()
							},
							"unico": {
								"cant_habitacion": $("#txtCantHabitacion").val(),
								"tarifa": $("#txtTarifa").val(),
								"cant_persona": $("#txtCantPersona").val()
							}
						};

						var resultado = app.validador(datos);

						if(resultado.status) {
							var respuesta = app.prototype.crearAlojamiento(datos);

							console.log(respuesta);
							
							if(respuesta) {
								return true;
							} else {
								return false;
							}
						} else {
							$("#alertValidation").html(resultado.html);
							$("#alertValidation").removeClass('hidden');
							return false;
						}
					}
				}
			});
		}

		app.bindings = function() {
			//Si cambia el select de Clasificacion de Alojamientos
			$("#slcClasificacion").change(function() {
				var valor = $('#slcClasificacion option:selected').text();
				

				if(valor === "Hotel") {
					$("#slcCategoria").attr('disabled', false);
				} else {
					$("#slcCategoria").attr('disabled', true);
				}

				$('select[id=slcCategoria]').selectpicker('refresh');
			});

			$("#slcTipoAlquiler").change(function() {
				var valor = $('#slcTipoAlquiler option:selected').val();

				if(valor == 0) {
					$("#divUnico").removeClass('hidden');
				} else {
					$("#divUnico").addClass('hidden');
				}
			});
		};

		app.validador = function(datos) {
			var html = '<ul class="uo-list">';
			var boolean = true;

			//Verifico que haya llenado todos los datos de Principal
			for(var i=0; i < Object.keys(datos.principal).length; i++) {
				if(Object.values(datos.principal)[i] === '') {
					html += '<li class="ml-20">Debe ingresar <span class="uppercase-font weight-600">'+Object.keys(datos.principal)[i]+'</span></li>';
					boolean = false;
				}
			}

			//Verifico que haya llenado todos los datos de Domicilio
			for(var i=0; i < Object.keys(datos.domicilio).length; i++) {
				if(Object.values(datos.domicilio)[i] === '') {
					html += '<li class="ml-20">Debe ingresar <span class="uppercase-font weight-600">'+Object.keys(datos.domicilio)[i]+'</span></li>';
					boolean = false;
				}
			}

			//Verifico que haya elegido una clasificación
			if(datos.clasificacion.clasificacion == -1) {
				html += '<li class="ml-20">Debe elegir una <span class="uppercase-font weight-600">Clasificación</span></li>';
				boolean = false;
			}

			//Verifico que haya llenado la hora de ingreso y egreso, y que sea una hora correcta (Se pone en 1, porque 0 es tipo)
			for(var i=1; i < Object.keys(datos.adicional).length; i++) {
				if(Object.values(datos.adicional)[i] === '') {
					html += '<li class="ml-20">Debe ingresar <span class="uppercase-font weight-600">'+Object.keys(datos.adicional)[i]+'</span></li>';
					boolean = false;
				} else {
					var resultado = app.verificarHora(Object.values(datos.adicional)[i]);

					if(!resultado) {
						html += '<li class="ml-20"><span class="uppercase-font weight-600">'+Object.keys(datos.adicional)[i]+': </span>Debe ingresar una hora correcta (Por ej: 12:00 o 23:59).</li>';
						boolean = false;
					}
				}
			}

			//Verifico si tipo es Alojamiento Completo, y si ha llenado los datos de unico
			if(datos.adicional.tipo == 0) {
				for(var i=0; i < Object.keys(datos.unico).length; i++) {
					if(Object.values(datos.unico)[i] === '') {
						html += '<li class="ml-20">Debe ingresar <span class="uppercase-font weight-600">'+Object.keys(datos.unico)[i]+'</span></li>';
						boolean = false;
					}
				}
			}

			html += '</ul>';

			if(boolean) {
				return {
					status: true,
					datos: datos
				};
			} else {
				return {
					status: false,
					html: html
				};
			}
		};

		app.verificarHora = function(datos) {
			var hora = datos.split(":").map(Number);
			var boolean = true;

			if(hora[0] < 0 || hora[0] > 23 || hora[1] < 0 || hora[1] > 59) {
				boolean = false;
			}

			if(boolean) {
				return true;
			} else {
				return false;
			}
		}

		app.init();
	})(funcionCrearAlojamiento);
});