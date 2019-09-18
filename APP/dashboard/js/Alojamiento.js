function Alojamiento() {
	var _token = sessionStorage.getItem('token');
    var _url = "http://localhost:65000/api/v1";

    var _direccion = [];
    /*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PÚBLICAS --------------------
     * ---------------------------------------------------------
     */
     //Obtiene todos los alojamientos, segun el tipo
    this.getAlojamientos = function(tipo) {
     	var settings = {
		  	"url": _url + "/alojamientos/" + tipo,
		  	"method": "GET"
		}

		$.ajax(settings).done(function (response) {
			if(response.status) {
				mostrarAlojamientos(response.resultado);
			} else {
				swal({
                    title: "Error",
                    text: response.message,
                    icon: "error"
                });
			}
		});
     }

     //Obtiene todas las clasificaciones
    this.getClasificaciones = function() {
     	var settings = {
		  	"url": _url + "/clasificacion",
		  	"method": "GET"
		}

		$.ajax(settings).done(function (response) {
			if(response.status) {
				mostrarClasificaciones(response.resultado);
			} else {
				swal({
                    title: "Error",
                    text: response.message,
                    icon: "error"
                });
			}
		});
     }


     //Muestra la direccion del alojamiento
    this.mostrarDireccion = function(id) {
     	var html = "";
     	$.each(_direccion, function(i, value) {
     		if(id == value.id) {
     			html += '<h5 class="mb-15">Calle: <small><span id="spnCalle">'+value.domicilio.calle + '</span> <span id="spnNumero">' + value.domicilio.numero+'</span></small></h5>'+
     				'<h5 class="mb-15">Cod. Postal: <small><span id="spnCP">'+value.domicilio.cp+'</span></small></h5><hr>' +
					'<h5 class="mb-15">Ciudad: <small><span id="spnCiudad">'+value.domicilio.ciudad+'</span></small></h5>' +
					'<h5 class="mb-15">Provincia: <small><span id="spnProvincia">'+value.domicilio.provincia+'</span></small></h5><hr>' +
					'<h5 class="mb-15">País: <small><span id="spnPais">'+value.domicilio.pais+'</span></small></h5>';
     		}
     	});

		$("#mdlDireccionAlojamientoBody").html(html);
		$("#mdlDireccionAlojamiento").modal('show');
     }

     //Edita la direccion del alojamiento
    this.editarDireccion = async function(datos) {
    	var latlong = await obtenerLatitudLongitud(datos);

    	if(latlong.status) {
    		datos.latitud = latlong.latitud;
    		datos.longitud = latlong.longitud;

    		var settings = {
			  	"url": _url + "/domicilio/" + datos.id_domicilio,
			  	"method": "PUT",
			  	"headers": {
			    	"Authorization": _token,
			    	"Content-Type": "application/json"
			  	},
			  	"data": JSON.stringify(datos)
			};

			$.ajax(settings).done(function (response) {
				if(response.status) {
					swal({
		    			title: 'Éxito',
		    			text: 'Se actualizó la dirección satisfactoriamente.',
		    			icon: 'success'
		    		}).then(() => {
		    			$("#mdlEditarDireccion").modal('hide');
		    			location.reload();
		    		});
				} else {
					swal({
		    			title: 'Error',
		    			text: 'No se ha podido editar la dirección, intente luego.',
		    			icon: 'error'
		    		}).then(() => {
		    			$("#mdlEditarDireccion").modal('hide');
		    		});
	    		}
			});
    	} else {
    		swal({
    			title: 'Error',
    			text: 'No se ha podido encontrar la latitud y longitud de la dirección ingresada, compruebe que los datos sean correctos.',
    			icon: 'error'
    		}).then(() => {
    			$("#mdlEditarDireccion").modal('hide');
    		});
    	}
    }

    //Funcion que edita el alojamiento
    this.editarAlojamiento = function(datos) {
    	var settings = {
			"url": _url + "/alojamiento/" + datos.id,
			"method": "PUT",
			"headers": {
				"Authorization": _token,
			    "Content-Type": "application/json"
			},
			"data": JSON.stringify(datos)
		};

		$.ajax(settings).done(function (response) {
			if(response.status) {
				swal({
                    title: "Éxito",
                    text: response.message,
                    icon: "success"
                }).then(() => {
		    		$("#mdlEditarAlojamiento").modal('hide');
		    		location.reload();
		    	});
			} else {
				swal({
                    title: "Error",
                    text: response.message,
                    icon: "error"
                });
			}
		});
    }

    this.crearAlojamiento = function(datos) {
        var settings = {
            "url": _url + "/alojamiento",
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": _token
            },
            "data": JSON.stringify(datos)
        }

        $.ajax(settings).done(function (response) {
          if(response.status) {
            return true;
          } else {
            return false;
          }
        });
    }
    /*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PRIVADAS --------------------
     * ---------------------------------------------------------
     */
    function mostrarAlojamientos(alojamientos) {
     	var data = [];

        $.each(alojamientos, function(key, alojamiento) {
        	var fecha_alta = formatDate(alojamiento.fecha_alta);
        	var fecha_baja = "";
        	var categoria = "";
        	var descripcion = formatDescripcion(alojamiento.descripcion);

            if(alojamiento.fecha_baja == null) {
                fecha_baja = " --------------- ";
            } else {
                fecha_baja = formatDate(alojamiento.fecha_baja);
            }

            if(alojamiento.categoria == null) {
            	categoria = " --------------- ";
            } else {
            	categoria = alojamiento.categoria;
            }

            data[key] = {
                "id": alojamiento.id,
                "nombre": alojamiento.nombre,
                "descripcion": descripcion,
                "fecha_alta": fecha_alta,
                "fecha_baja": fecha_baja,
                "clasificacion": alojamiento.clasificacion_nombre,
                "domicilio": {
                	"id_domicilio": alojamiento.fk_domicilio,
                	"calle": alojamiento.calle,
                	"numero": alojamiento.numero,
                	"ciudad": alojamiento.ciudad,
                	"provincia": alojamiento.provincia,
                	"pais": alojamiento.pais,
                	"cp": alojamiento.cp,
                	"latitud": alojamiento.latitud,
                	"longitud": alojamiento.longitud
                },
                "categoria": categoria
            };

            _direccion.push({
        		"id": alojamiento.fk_domicilio,
        		"domicilio": data[key].domicilio
        	});
        });

        $('#tblAlojamientos').DataTable({
            "data": data,
            destroy: true,
            rowId: 'id',
            responsive: true,
            "language": {
                "sProcessing": "Procesando...",
                "lengthMenu": "Mostrar _MENU_",
                "zeroRecords": "No existe ningún registro.",
                "info": "Página _PAGE_ de _PAGES_",
                "infoEmpty": "No hay registros.",
                "infoFiltered": "(Filtrado de _MAX_ datos)",
                "sSearch": "Buscar:",
                "oPaginate": {
                    "sFirst": "Primero",
                    "sLast": "Último",
                    "sNext": "Siguiente",
                    "sPrevious": "Anterior"
                }
            },
            columns: [
                { "data": "nombre" },
                { 
                	"data": function(key) {
                		return '<button id="btnVerDescripcion" data-descripcion="'+ key.descripcion.total +'" class="btn btn-link" style="color: #878787; padding: 0;">'+key.descripcion.resumen+'</button>'
                	}
            	},
                { "data": "clasificacion"},
                { "data": "categoria"},
                { "data": function(key) {
	                		return '<button id="btnVerDomicilio" data-id="'+ key.domicilio.id_domicilio +'" class="btn btn-default btn-rounded">VER</button>';
	                	}
	            },
	            { "data": "fecha_alta"},
	            { "data": "fecha_baja"},
                {
                    "data": function(key) {
                        return '<button id="btnEditarAlojamiento" data-id="' + key.id + '" class="btn btn-success btn-icon-anim btn-circle"><i class="fa fa-pencil"></i></button> ' +
                            ' <button id="btnEliminarAlojamiento" data-id="' + key.id + '" class="btn btn-danger btn-icon-anim btn-circle"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
     }

    function mostrarClasificaciones(clasificaciones) {
    	var html = '<option value="-1" disabled selected>- Seleccione una clasificación -</option>';

		$.each(clasificaciones, function(key, clasificacion) {
			html += '<option value="'+clasificacion.id+'">'+clasificacion.nombre+'</option>';
		});

		$("#slcClasificacion").html(html);
		$('select[id=slcClasificacion]').selectpicker('refresh');
		$("#mdlEditarAlojamiento").modal('show');
    }

    function formatDate(fecha) {
        var date = new Date(fecha);

        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        var monthNames = [
            "ENE", "FEB", "MAR",
            "ABR", "MAYO", "JUN", "JUL",
            "AGO", "SEP", "OCT",
            "NOV", "DIC"
        ];

        return day + " / " + monthNames[month] + " / " + year;
    }

    function obtenerLatitudLongitud(datos) {
    	return new Promise(function(resolve) {
			var direccion = `${datos.calle}+${datos.numero}+${datos.ciudad}+${datos.provincia}+${datos.pais}`;
	    	var key = "AIzaSyCbAzYrcpFuVjAvnoA1Yw1KxvgfuDdBfsw";
	    	
	    	var settings = {
			  "url": `https://maps.googleapis.com/maps/api/geocode/json?address=${direccion}&key=${key}`,
			  "method": "GET"
			}

			$.ajax(settings).done(function (response) {
				if(response.status === "OK") {
					resolve({
						"status": true,
						"latitud": response.results[0].geometry.location.lat,
						"longitud": response.results[0].geometry.location.lng
					});
				} else {
					resolve({
						"status": false,
						"error": response.error_message
					});
				}
			});
    	});
    }

    function formatDescripcion(descripcion) {
    	var result;

    	if(descripcion.length > 13) {
    		var text = descripcion.substr(0, 13);

    		result = {
    			"resumen": text + '...',
    			"total": descripcion
    		};
    	} else {
    		result = {
    			"resumen": descripcion,
    			"total": descripcion
    		};
    	}
		
    	return result;
    }
}