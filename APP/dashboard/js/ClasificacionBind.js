$(function() {
	var funcionClasificacion = {};

	(function(app) {
		app.prototype = new Clasificacion();

		app.init = function() {
	        app.prototype.getClasificaciones();
	        app.bindings();
	    };

	    app.bindings = function() {
	    	//Click en crear clasificacion
	    	$("#btnAgregarClasificacionModal").on("click", function(e) {
				e.preventDefault();

				$(".modal-title").text("Agregar Clasificación");
				$("#divEditarClasificacion").hide();
				$("#divAgregarClasificacion").show();
				$("#mdlAgregar").modal('show');
			});

			//Click en Agregar
			$("#btnAgregar").on("click", function(e) {
				e.preventDefault();
				var nombre = $("#txtNombre").val();

				app.prototype.crearClasificacion(nombre);
			});

			//Click en editar clasificacion
            $('#tblClasificacion tbody').on('click', '#btnEditarClasificacion', function () {
            	var id = $(this).data("id");
            	var table = $("#tblClasificacion").DataTable();
	            var data = table.row($(this).parents('tr')).data();

        		$(".modal-title").text("Editar clasificación");
        		$("#txtNombre").val(data["nombre"]);

        		$("#btnEditar").data('id', id);

        		$("#divAgregarClasificacion").hide();
        		$("#divEditarClasificacion").show();
        		$("#mdlAgregar").modal('show');
    		});

    		//Click en btnEditar
    		$("#btnEditar").on("click", function(e) {
    			e.preventDefault();
    			var id = $(this).data("id");
    			var nombre = $("#txtNombre").val();

    			app.prototype.editarClasificacion(id, nombre);
    		});

    		//Click en boton Eliminar Clasificacion
	        $("#tblClasificacion tbody").on('click', '#btnEliminarClasificacion', function() {
	            var id = $(this).data('id');
	            
	            swal({
	                title: "¿Estas seguro?",
	                text: "Recuerda que si eliminas una clasificación y tiene una reserva en su lista, no va haber vuelta atrás.",
	                icon: "warning",
	                buttons: true,
	                dangerMode: true,
	            }).then((willDelete) => {
	                if (willDelete) {
	                    app.prototype.eliminarClasificacion(id);
	                }
	            });
	        });

	        //Click en Reestablecer Clasificacion
	        $("#tblClasificacion tbody").on('click', '#btnReestablecerClasificacion', function() {
	        	var id = $(this).data('id');

	        	app.prototype.reestablecerClasificacion(id);
	        });
	    };

	    app.init();
	})(funcionClasificacion);
});