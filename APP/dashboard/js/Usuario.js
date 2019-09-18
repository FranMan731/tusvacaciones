function Usuario() {
    var _token = sessionStorage.getItem('token');
    var _url = "http://localhost:65000/api/v1";

    /*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PÚBLICAS --------------------
     * ---------------------------------------------------------
     */
    // Función que obtiene todos los usuarios
    this.getUsuarios = function() {
        var settings = {
            "url": _url + "/usuario",
            "method": "GET",
            "headers": {
                "Authorization": _token
            }
        }

        $.ajax(settings).done(function(response) {
            if (response.status) {
                mostrarUsuarios(response.resultado);
            } else {
                swal({
                    title: "Error",
                    text: response.message,
                    icon: "error"
                });
            }
        });
    }

    // Funcion que edita un usuario
    this.editarUsuario = function(id, fk_rol) {
    	var datos = {
    		"fk_rol": fk_rol
    	};

        var settings = {
            "url": _url + "/actualizar-rol/" + id,
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": _token
            },
            "data": JSON.stringify(datos)
        }

        $.ajax(settings).done(function(response) {
            if(response.status) {
            	swal({
                    title: "Editado",
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

    // Funcion que elimina un usuario
    this.eliminarUsuario = function(id) {
        var settings = {
          "url": _url + "/usuario/" + id,
          "method": "DELETE",
          "headers": {
            "Authorization": _token
          }
        }

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
    function mostrarUsuarios(usuarios) {
        var data = [];

        $.each(usuarios, function(key, usuario) {
            data[key] = {
                "id": usuario.id,
                "email": usuario.email,
                "rol": usuario.rol
            };
        });

        $('#tblUsuario').DataTable({
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
                { "data": "email" },
                { "data": "rol" },
                {
                    "data": function(key) {
                        return '<button id="btnEditarUsuario" data-id="' + key.id + '" class="btn btn-success btn-icon-anim btn-circle"><i class="fa fa-pencil"></i></button> ' +
                            ' <button id="btnEliminarUsuario" data-id="' + key.id + '" class="btn btn-danger btn-icon-anim btn-circle"><i class="fa fa-trash-o"></i></button>';
                    }
                }
            ]
        });
    }
}