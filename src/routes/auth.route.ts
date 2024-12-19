import { Router } from "express";
import { Routes } from "../interfaces/routes.interfaces";
import AuthController from "../controllers/auth.controller";

class AuthRoutes implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController()

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.authController.login);
    this.router.post(`${this.path}/logout`, this.authController.logout);
  }
}

export default AuthRoutes;
