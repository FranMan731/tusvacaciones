import mysql = require('mysql');
var config = require('../API/config/config-db.js');

export default class Database {
	private static _instance: Database;
	cnn: mysql.Connection;

	constructor() {
		this.cnn = mysql.createConnection({
			host     : config.database.host,
			user     : config.database.user,
			password : config.database.password,
			database : config.database.db
		});

		this.conectarDB();
	}

	public static get instance() {
		return this._instance || (this._instance = new this());
	}

	static ejecutarQuery(query: string, datos: Array<string>, callback: Function) {
		this.instance.cnn.query(query, datos, (err, results: Object[], fields) => {
			if(err) {
				console.log("Error en Query.");
				console.log(err);

				return callback(err);
			}

			if(results.length === 0) {
				callback('No hay registros');
			} else {
				callback(null, results);
			}
		});
	}

	static iniciarTransaction() {
		this.instance.cnn.beginTransaction();
	}

	static confirmarTransaction() {
		this.instance.cnn.commit();
	}

	static rollbackTransaction() {
		this.instance.cnn.rollback();
	}

	private conectarDB() {
		this.cnn.connect((err: mysql.MysqlError) => {
			if(err) {
				console.log("Error:");
				console.log(err);
				return;
			}

			console.log("Base de datos conectada.");
		});
	}
}