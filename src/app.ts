import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect, disconnect } from "mongoose";
import { Routes } from "./interfaces/routes.interfaces";
import dotenv from 'dotenv'; 
import { config } from "./configs/config";

class App {
  public app: express.Application;
  public port: string | number;

  private allowedOrigins = ['http://localhost:3000'];

  constructor(routes: Routes[]) {
    dotenv.config();
    this.app = express();
    this.port = config.server.port;

    this.app.use(cors({
      origin: this.allowedOrigins
    }));
    this.app.use(bodyParser.json());
    this.connectToDatabase();
    this.initializeRoutes(routes);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.info(`=================================`);
      console.info(`======= ENV: development =======`);
      console.info(`🚀 App listening on the port ${this.port}`);
      console.info(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  public async closeDatabaseConnection(): Promise<void> {
    try {
      await disconnect();
      console.log('Disconnected from MongoDB');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }

  private async connectToDatabase() {
    try {
      const uri = "mongodb+srv://rudylpzjme:465-austin@cluster0.02otob3.mongodb.net/billiards-pos?retryWrites=true&w=majority&appName=Cluster0";
      await connect(uri)
      console.log("Database connection sucessful")
    } catch(error: unknown) {
      console.error(`ERROR: ${error}`)
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route: any) => {
      this.app.use('/', route.router);
    })
  }
}

export default App;
