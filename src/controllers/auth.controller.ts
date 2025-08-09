import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { IAuthService } from '../services/interfaces/iauth.service';
import { IAuthController } from './interfaces/iauth.controller';
import { NextFunction, Request, Response } from 'express';

@injectable()
export class AuthController implements IAuthController {
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req?.body;
      const company = await this.authService.validateCompany(email, password);

      if (!company) {
        res.status(401).json({ message: 'Invalid credential' });
        return;
      }

      const token = await this.authService.generateToken(company);

      res.json({ token, company: { id: company.id, email: company.email } });
    } catch (err) {
      next(err);
    }
  }
}
