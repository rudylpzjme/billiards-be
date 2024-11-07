import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connect, disconnect } from "mongoose";
import { Routes } from "./interfaces/routes.interfaces";
import dotenv from 'dotenv'; 
import { config } from "./configs/config";
import session from "express-session";
import { inititializePassportStrategy } from "./configs/passport";
import path from "path";

class App {
  public app: express.Application;
  public port: string | number;

  private allowedOrigins = ['http://localhost:3000', 'http://217.196.51.118:3000', 'http://217.196.51.118'];

  constructor(routes: Routes[]) {
    dotenv.config();
    this.app = express();
    this.port = config.port;

    this.app.use(cors({
      origin: this.allowedOrigins
    }));
    this.app.use(bodyParser.json());
    this.app.use(session({
      secret: "This is a secret",
      resave: false,
      saveUninitialized: false
    }));
    // this.app.use(express.static(path.join(__dirname, 'dist')));
    // this.app.get('*', (req, res) => {
    //   res.sendFile(path.join(__dirname, 'index.html'));
    // })

    this.connectToDatabase();
    this.initializeRoutes(routes);
    inititializePassportStrategy(this.app);
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
      const uri = `${config.db.host}://${config.db.username}:${config.db.password}@cluster0.02otob3.mongodb.net/${config.db.name}?retryWrites=true&w=majority`;
      console.log("URI", uri);
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
