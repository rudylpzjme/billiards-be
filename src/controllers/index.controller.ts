import { NextFunction, Request, Response } from 'express';
import UserService from '../services/users.service';
import { User } from '../models/users.model';

class IndexController {
  public index = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username } = req.body
      const userService = new UserService();
      const user: User = await userService.findUserByUsername(username);
      res.status(200).json({
        fullname: user.fullname,
        username,
        email: user.email,
        role: user.role,
        age: user.age,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default IndexController;
