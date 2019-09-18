import express = require('express');
import path = require('path');

export default class App {
	public app: express.Application;
	public port: number;

	constructor(puerto: number) {
		this.port = puerto;
		this.app = express();
	}

	static init(puerto: number) {
		return new App(puerto);
	}

	private publicFolder() {
		const publicPath = path.resolve(__dirname, '/APP/dashboard');
	
		this.app.use('dashboard', express.static(publicPath));
	}

	start(callback: Function) {
		this.app.listen(this.port, callback);
		this.publicFolder();
	}
}