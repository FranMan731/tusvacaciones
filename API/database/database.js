"use strict";
exports.__esModule = true;
var mysql = require("mysql");
var config = require('../config/config-db.js');
var Database = /** @class */ (function () {
    function Database() {
        this.cnn = mysql.createConnection({
            host: config.database.host,
            user: config.database.user,
            password: config.database.password,
            database: config.database.db
        });
        this.conectarDB();
    }
    Object.defineProperty(Database, "instance", {
        get: function () {
            return this._instance || (this._instance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Database.ejecutarQuery = function (query, datos, callback) {
        this.instance.cnn.query(query, datos, function (err, results, fields) {
            if (err) {
                console.log("Error en Query.");
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback(null, results);
            }
            else {
                callback(null, results);
            }
        });
    };
    Database.iniciarTransaction = function () {
        this.instance.cnn.beginTransaction();
    };
    Database.confirmarTransaction = function () {
        this.instance.cnn.commit();
    };
    Database.rollbackTransaction = function () {
        this.instance.cnn.rollback();
    };
    Database.prototype.conectarDB = function () {
        this.cnn.connect(function (err) {
            if (err) {
                console.log("Error:");
                console.log(err);
                return;
            }
            console.log("Base de datos conectada.");
        });
    };
    return Database;
}());
module.exports = Database;
