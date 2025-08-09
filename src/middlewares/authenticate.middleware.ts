import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';
import passport from 'passport';

@injectable()
export class AuthMiddleware {
  authenticate(req: Request, res: Response, next: NextFunction): void {
    passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
      if (err) return next(err);
      if (!user) return res.status(401).json({ message: 'Unauthorized' });
      req.user = user;
      next();
    })(req, res, next);
  }
}
