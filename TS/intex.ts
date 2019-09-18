import App from './app';
import favicon = require('serve-favicon');
import bodyParser = require('body-parser');
import cors = require('cors');
import router from './API/routes/index.js';
import Database from './database';

const server = App.init(65000);

//middlewares
server.app.use(bodyParser.urlencoded({extended:false}));
server.app.use(bodyParser.json());

//Cors
server.app.use(cors());

//Routes
server.app.use(router);

//Conexion de base de datos
Database.instance;

server.start( () => {
	console.log('Servidor corriendo en el puerto 65000');
});