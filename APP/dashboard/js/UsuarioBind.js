$(function() {
	var funcionUsuarios = {};

	(function(app) {
	        app.prototype = new Usuario();

	        app.init = function() {
	            app.prototype.getUsuarios();
	            app.bindings();
	        }

	        app.bindings = function() {
	            //Click en boton Editar Usuario
	            $('#tblUsuario tbody').on('click', '#btnEditarUsuario', function() {
	                var id = $(this).data("id");
	                var table = $("#tblUsuario").DataTable();
	                var data = table.row($(this).parents('tr')).data();

	                $("#txtEmailUsuario").val(data["email"]);
	                $("#btnEditarUsuarioModal").data('id', id);
	                $("#mdlEditarUsuario").modal('show');
	            });

	            //Click Guardar la edición del usuario
	            $("#mdlEditarUsuario").on('click', '#btnEditarUsuarioModal', function(e) {
	                e.preventDefault();
	                var id = $(this).data("id");
	                var fk_rol = $('select[id=slcUsuarioRol]').val();

	                app.prototype.editarUsuario(id, fk_rol);
	            });

	            //Click en boton Eliminar Usuario
	            $("#tblUsuario tbody").on('click', '#btnEliminarUsuario', function() {
	                var id = $(this).data('id');
	                swal({
	                    title: "¿Estas seguro?",
	                    text: "Recuerda que si eliminas un usuario y tiene una reserva en su lista, no va haber vuelta atrás.",
	                    icon: "warning",
	                    buttons: true,
	                    dangerMode: true,
	                })
	                .then((willDelete) => {
	                    if (willDelete) {
	                        app.prototype.eliminarUsuario(id);
	                    }
	                });
	            });
			}
		app.init();
	})(funcionUsuarios);
});
