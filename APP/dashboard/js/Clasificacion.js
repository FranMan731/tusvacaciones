function Clasificacion() {
	var _token = sessionStorage.getItem('token');
    var _url = "http://localhost:65000/api/v1";

    /*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PÚBLICAS --------------------
     * ---------------------------------------------------------
     */
     //Funcion que obtiene todas las clasificaciones que no han sido dada de baja
     this.getClasificaciones = function() {
        var settings = {
            "url": _url + "/clasificacion-total",
            "method": "GET",
            "headers": {
                "Authorization": _token
            }
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

     //Funcion que crea una clasificacion
     this.crearClasificacion = function(nombre) {
        var datos = {
            "nombre": nombre
        };

        var settings = {
            "url": _url + "/clasificacion",
            "method": "POST",
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

     //Funcion que edita una clasificacion
     this.editarClasificacion = function(id, nombre) {
        var datos = {
            "nombre": nombre
        };
        
        var settings = {
            "url": _url + "/clasificacion/" + id,
            "method": "PUT",
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

     //Elimina una clasificación
     this.eliminarClasificacion = function(id) {
        var settings = {
            "url": _url + "/clasificacion/" + id,
            "method": "DELETE",
            "headers": {
                "Authorization": _token
            }
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

     this.reestablecerClasificacion = function(id) {
        var settings = {
            "url": _url + "/clasificacion/"+ id +"/reestablecer",
            "method": "PUT",
            "headers": {
                "Authorization": _token
            }
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
    /*
     * ---------------------------------------------------------
     * ----------------- FUNCIONES PRIVADAS --------------------
     * ---------------------------------------------------------
     */
     function mostrarClasificaciones(clasificaciones) {
        var data = [];

        $.each(clasificaciones, function(key, clasificacion) {
            var fecha_alta = formatDate(clasificacion.fecha_alta);
            var fecha_baja = "";

            if(clasificacion.fecha_baja == null) {
                fecha_baja = " --------------- "
            } else {
                fecha_baja = formatDate(clasificacion.fecha_baja);
            }

            data[key] = {
                "id": clasificacion.id,
                "nombre": clasificacion.nombre,
                "fecha_alta": fecha_alta,
                "fecha_baja": fecha_baja,
                "baja": clasificacion.baja
            };
        });

        $('#tblClasificacion').DataTable({
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
                { "data": "nombre" },
                { "data": "fecha_alta" },
                { "data": "fecha_baja" },
                {
                    "data": function(key) {
                        if(key.baja == 0) {
                        return '<button id="btnEditarClasificacion" data-id="' + key.id + '" class="btn btn-success btn-icon-anim btn-circle"><i class="fa fa-pencil"></i></button> ' +
                            ' <button id="btnEliminarClasificacion" data-id="' + key.id + '" class="btn btn-danger btn-icon-anim btn-circle"><i class="fa fa-trash-o"></i></button>';
                        } else {
                             return '<button id="btnReestablecerClasificacion" data-id="' + key.id + '" class="btn btn-warning btn-icon-anim btn-circle"><i class="fa fa-refresh"></i></button> ';
                        }
                    }
                }
            ]
        });
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
}