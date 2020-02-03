import express from 'express';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';

class App {
    public express: express.Application;
    private port: string;
    private databaseUri: string;

    constructor(port: string, databaseUri: string) {
        this.express = express();
        this.port = port;
        this.databaseUri = databaseUri;
    }

    public init(): void {
        this.expressConfig();
        this.setRoutes();
        this.dbConfig();
        this.appListen();
    }

    private expressConfig(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cors());
    }

    private setRoutes(): void {
        const indexRoute = require('./routes/index') as NodeRequire;
        this.express.use('/', indexRoute);
    }

    private dbConfig(): void {
        mongoose.connect(this.databaseUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Mongoose Connected'))
        .catch(error => console.error(`Mongoose Could Not Connect ${error}`));
        mongoose.set('debug', true);
        mongoose.set('useCreateIndex', true);
    }

    private appListen(): void {
        if (this.port) {
            const server = http.createServer(this.express) as http.Server;
            server.listen(this.port);
            server.on('listening', () => console.log(`Listening on port ${this.port}`));
        } else {
            throw new Error('Port is not set');
        }
    }
}

export default App;