$(function() {
	var funcionAlojamiento = {};

	(function(app) {
		app.prototype = new Alojamiento();

		app.init = function() {
			app.prototype.getAlojamientos(0);
			app.bindings();
		};

		app.bindings = function() {
			//Si cambia el select de Tipo de Alojamientos
			$("#slcTipoAlojamiento").change(function() {
				var valor = $('#slcTipoAlojamiento option:selected').val();

				app.prototype.getAlojamientos(valor);
			});

			//Click en ver descripcion
			$("#tblAlojamientos tbody").on('click', '#btnVerDescripcion', function() {
				var descripcion = $(this).data("descripcion");

				var html = '<h5 style="text-transform: none;">'+descripcion+'</h5>';

				$("#mdlDescripcionBody").html(html);
				$("#mdlDescripcion").modal('show');
			});

			//Click en Editar ALojamiento
			$('#tblAlojamientos tbody').on('click', '#btnEditarAlojamiento', function() {
				var id = $(this).data("id");
				var table = $("#tblAlojamientos").DataTable();
	            var data = table.row($(this).parents('tr')).data();

	            var descripcion = data["descripcion"];
	            
	            $("#txtNombre").val(data["nombre"]);
	            $("#txtDescripcion").val(descripcion.total);

				app.prototype.getClasificaciones();
				$("#btnGuardarEditarAlojamiento").data('id', id);
			});

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

			//Click en btnGuardarEditarAlojamiento
			$('#btnGuardarEditarAlojamiento').on('click', function(e) {
				e.preventDefault();

				var clasificacion = $('#slcClasificacion option:selected').text();

				if(clasificacion === "Hotel") {
					var datos = {
						"id": $(this).data("id"),
						"nombre": $("#txtNombre").val(),
						"descripcion": $("#txtDescripcion").val(),
						"fk_clasificacion": $('#slcClasificacion option:selected').val(),
						"categoria": $('#slcCategoria option:selected').text()
					}
				} else {
					var datos = {
						"id": $(this).data("id"),
						"nombre": $("#txtNombre").val(),
						"descripcion": $("#txtDescripcion").val(),
						"fk_clasificacion": $('#slcClasificacion option:selected').val(),
						"categoria": null
					}
				}
				
				app.prototype.editarAlojamiento(datos);				
			});

			//Click en Ver Domicilio
			$('#tblAlojamientos tbody').on('click', '#btnVerDomicilio', function() {
				var id = $(this).data("id");

				$("#btnEditarDireccion").data('id', id);
				app.prototype.mostrarDireccion(id);
			});

			//Click en Editar Direccion
			$("#btnEditarDireccion").on('click', function() {
				var id = $(this).data("id");
				var calle = $("#spnCalle").text();
				var numero = $("#spnNumero").text();
				var cp = $("#spnCP").text();
				var ciudad = $("#spnCiudad").text();
				var provincia = $("#spnProvincia").text();
				var pais = $("#spnPais").text();

				$("#txtCalle").val(calle);
				$("#txtNumero").val(numero);
				$("#txtCP").val(cp);
				$("#txtCiudad").val(ciudad);
				$("#txtProvincia").val(provincia);
				$("#txtPais").val(pais);
				$("#btnGuardarEditar").data('id', id);
			});

			//Click en Guardar Editar
			$("#btnGuardarEditar").on('click', function(e) {
				e.preventDefault();

				var datos = {
					"id_domicilio": $(this).data("id"),
					"calle": $("#txtCalle").val(),
					"numero": $("#txtNumero").val(),
					"cp": $("#txtCP").val(),
					"ciudad": $("#txtCiudad").val(),
					"provincia": $("#txtProvincia").val(),
					"pais": $("#txtPais").val(),
					"latitud": 0,
					"longitud": 0
				};

				app.prototype.editarDireccion(datos);
			});
		};

		app.init();
	})(funcionAlojamiento);
});