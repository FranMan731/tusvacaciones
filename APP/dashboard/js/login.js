$(function() {
	var _url = "http://localhost:65000/api/v1";

	$("#btnIngresar").on('click', function(e) {
		e.preventDefault();

		var email = $("#txtEmailLogin").val();
		var password = $("#txtPasswordLogin").val();

		var datos = {
			"email": email,
			"password": password
		};

		var settings = {
			"async": true,
			"crossDomain": true,
			"url": _url + "/ingresar",
			"method": "POST",
			"headers": {
				"Content-Type": "application/json"
			},
			"processData": false,
			"data": JSON.stringify(datos)
		}

		$.ajax(settings).done(function (response) {
			if(response.status) {
				sessionStorage.setItem('token', response.token);
				sessionStorage.setItem('email', response.email);
				
				window.location.href = 'http://localhost:65000/dashboard/index.html';
			} else {
				$("#errorLogin").removeAttr('hidden');
			}
		}).fail(function() {
				$("#errorServidor").removeAttr('hidden');
		});
	});

	$("#txtEmailLogin").keypress(function(event) {
		$("#errorLogin").attr('hidden', true);
		$("#errorServidor").attr('hidden', true);
	});

	$("#txtPasswordLogin").keypress(function(event) {
		$("#errorLogin").attr('hidden', true);
		$("#errorServidor").attr('hidden', true);
	});
});