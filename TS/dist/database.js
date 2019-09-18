"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
const config_db_js_1 = __importDefault(require("../API/config/config-db.js"));
class Database {
    constructor() {
        this.cnn = mysql.createConnection({
            host: config_db_js_1.default.database.host,
            user: config_db_js_1.default.database.user,
            password: config_db_js_1.default.database.password,
            database: config_db_js_1.default.database.db
        });
        this.conectarDB();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log("Error en Query.");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No hay registros');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log("Error:");
                console.log(err);
                return;
            }
            console.log("Base de datos conectada.");
        });
    }
}
exports.default = Database;
