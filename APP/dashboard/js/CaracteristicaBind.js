$(function() {
	var funcionCaracteristica = {};

	(function(app) {
		app.prototype = new Caracteristica();

		app.init = function() {
	        app.prototype.getCaracteristicas();
	        app.bindings();
	    };

	    app.bindings = function() {
	    	//Click en crear caracteristica
	    	$("#btnAgregarCaracteristicaModal").on("click", function(e) {
				e.preventDefault();

				$(".modal-title").text("Agregar caracteristica");
				$("#divEditarCaracteristica").hide();
				$("#divAgregarCaracteristica").show();
				$("#mdlAgregar").modal('show');
			});

			//Click en Agregar
			$("#btnAgregar").on("click", function(e) {
				e.preventDefault();
				var denominacion = $("#txtDenominacion").val();

				app.prototype.crearCaracteristica(denominacion);
			});

			//Click en editar caracteristica
            $('#tblCaracteristicas tbody').on('click', '#btnEditarCaracteristica', function () {
            	var id = $(this).data("id");
            	var table = $("#tblCaracteristicas").DataTable();
	            var data = table.row($(this).parents('tr')).data();

        		$(".modal-title").text("Editar producto");
        		$("#txtDenominacion").val(data["denominacion"]);

        		$("#btnEditar").data('id', id);

        		$("#divAgregarCaracteristica").hide();
        		$("#divEditarCaracteristica").show();
        		$("#mdlAgregar").modal('show');
    		});

    		//Click en btnEditar
    		$("#btnEditar").on("click", function(e) {
    			e.preventDefault();
    			var id = $(this).data("id");
    			var denominacion = $("#txtDenominacion").val();

    			app.prototype.editarCaracteristica(id, denominacion);
    		});

    		//Click en boton Eliminar Caracteristica
	        $("#tblCaracteristicas tbody").on('click', '#btnEliminarCaracteristica', function() {
	            var id = $(this).data('id');
	            
	            swal({
	                title: "¿Estas seguro?",
	                text: "Recuerda que si eliminas un usuario y tiene una reserva en su lista, no va haber vuelta atrás.",
	                icon: "warning",
	                buttons: true,
	                dangerMode: true,
	            }).then((willDelete) => {
	                if (willDelete) {
	                    app.prototype.eliminarCaracteristica(id);
	                }
	            });
	        });
	    }

	    app.init();
	})(funcionCaracteristica);
});