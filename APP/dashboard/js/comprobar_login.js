$(function() {
	if(sessionStorage.getItem('token') == null) {
		window.location.href = "http://localhost:65000/dashboard/login.html";
	}
});