function Caracteristica() {
	var _token = sessionStorage.getItem('token');
    var _url = "http://localhost:65000/api/v1";

    /*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PÚBLICAS --------------------
     * ---------------------------------------------------------
     */
    //Obtiene todas las caracteristicas
    this.getCaracteristicas = function() {
    	var settings = {
			"url": _url + "/caracteristica",
			"method": "GET",
			"headers": {
				"Authorization": _token
		  	}
		}

		$.ajax(settings).done(function (response) {
			if(response.status) {
				mostrarCaracteristicas(response.resultado);
			} else {
				swal({
                    title: "Error",
                    text: response.message,
                    icon: "error"
                });
			}
		});
    }

    //Crea una caracteristica
    this.crearCaracteristica = function(denominacion) {
    	var datos = {
    		"denominacion": denominacion
    	};

    	var settings = {
		  	"url": _url + "/caracteristica",
		  	"method": "POST",
		  	"headers": {
		  		"Content-Type": "application/json",
		    	"Authorization": _token
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

    //Edita una caracteristica
    this.editarCaracteristica = function(id, denominacion) {
    	var datos = {
    		"denominacion": denominacion
    	};

    	var settings = {
		  	"url": _url + "/caracteristica/" + id,
		  	"method": "PUT",
		  	"headers": {
		    	"Content-Type": "application/json",
		    	"Authorization": _token
		  	},
		  	"data": JSON.stringify(datos)
		}

		$.ajax(settings).done(function (response) {
			if(response.status) {
				swal({
					title: "Éxito",
					text: response.message,
					icon: "success"
				}).then(() => {
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

    //Elimina una caracteristica
    this.eliminarCaracteristica = function(id) {
    	var settings = {
		  	"url": _url + "/caracteristica/" + id,
		  	"method": "DELETE",
		  	"headers": {
		    	"Authorization": _token
		  	}
		};

		$.ajax(settings).done(function (response) {
			if(response.status) {
                swal({
                    title: "Eliminado",
                    text: response.message,
                    icon: "success"
                }).then(() => {
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
   	/*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PRIVADAS --------------------
     * ---------------------------------------------------------
     */
     function mostrarCaracteristicas(caracteristicas) {
     	var data = [];

        $.each(caracteristicas, function(key, caracteristica) {
            data[key] = {
                "id": caracteristica.id,
                "denominacion": caracteristica.denominacion
            };
        });

        $('#tblCaracteristicas').DataTable({
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
            	{ "data": "id"},
                { "data": "denominacion" },
                {
                    "data": function(key) {
                        return '<button id="btnEditarCaracteristica" data-id="' + key.id + '" class="btn btn-success btn-icon-anim btn-circle"><i class="fa fa-pencil"></i></button> ' +
                            ' <button id="btnEliminarCaracteristica" data-id="' + key.id + '" class="btn btn-danger btn-icon-anim btn-circle"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
     }
}