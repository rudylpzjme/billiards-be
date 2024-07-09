import { Request, Response, Router } from 'express';
import IndexController from '../controllers/index.controller';
import { Routes } from '../interfaces/routes.interfaces';
import passport from "passport";


class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.indexController.index);
    this.router.post(
      `${this.path}login`,
      passport.authenticate(
        'local',
        { failureRedirect: '/login' }),
        this.indexController.login
      )
  }
}

export default IndexRoute;
