var mysql = require('mysql');
var app = require('./app.js');
var config = require('./API/config/config-db.js');

require('./API/config/config.js');

global.connection = mysql.createConnection({
  host     : config.database.host,
  user     : config.database.user,
  password : config.database.password,
  database : config.database.db
});

connection.connect();

connection.query('SELECT 1', function(err, rows, fields) {
  	if (err) throw err;

	app.listen(process.env.PORT, () => {
		console.log('Conectado a la base de datos.');
		console.log("Servidor corriendo en http://localhost:65000");
	});
});

