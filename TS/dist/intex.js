"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const bodyParser = require("body-parser");
const cors = require("cors");
const index_js_1 = __importDefault(require("./API/routes/index.js"));
const database_1 = __importDefault(require("./database"));
const server = app_1.default.init(65000);
//middlewares
server.app.use(bodyParser.urlencoded({ extended: false }));
server.app.use(bodyParser.json());
//Cors
server.app.use(cors());
//Routes
server.app.use(index_js_1.default);
//Conexion de base de datos
database_1.default.instance;
server.start(() => {
    console.log('Servidor corriendo en el puerto 65000');
});
