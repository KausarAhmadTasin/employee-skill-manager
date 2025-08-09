import { NextFunction, Request, Response } from 'express';

export interface IAuthController {
  login(req: Request, res: Response, nest: NextFunction): Promise<void>;
}
