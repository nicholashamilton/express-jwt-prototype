import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

class App {
    public express: express.Application;
    private port: string;
    private mongoUri: string;

    constructor(port: string, mongoUri: string) {
        this.express = express();
        this.port = port;
        this.mongoUri = mongoUri;
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
        mongoose.connect(this.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(() => console.log('Mongoose Connected'))
        .catch(error => console.error(`Mongoose Could Not Connect ${error}`));
        mongoose.set('debug', true);
        mongoose.set('useCreateIndex', true);
    }

    private appListen(): void {
        if (this.port === undefined) {
            this.express.listen(this.port, () => console.log(`Listening on port ${this.port}`));
        } else {
            throw new Error('Port Is Undefined');
        }
    }
}

export default App;