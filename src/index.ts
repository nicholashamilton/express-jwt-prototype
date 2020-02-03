import dotenv from 'dotenv';
dotenv.config();
import App from './app';

const AppInstance = new App(process.env.SERVER_PORT, process.env.DATABASE_URI);
AppInstance.init();