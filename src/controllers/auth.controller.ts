import { Request, Response, NextFunction } from 'express';
import passport from 'passport';

class AuthController {


  // Handle Login
  public login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.status(401).json({ message: info.message });
      }
      req.logIn(user, (err) => {
          if (err) {
              return next(err);
          }
          return res.status(200).json({ message: 'Logged in successfully', user });
      });
    })(req, res, next);
  };

  // Handle Logout
  public logout = (req: Request, res: Response) => {
    // if (!req.isAuthenticated()) {
    //   return res.status(400).json({ message: "User is not logged in" });
    // }

    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.status(200).json({ message: 'Logged out successfully' });
    });
  };
}

export default AuthController;
