import { Router } from 'express';
import container from '../config/ioc.config';
import { IAuthController } from '../controllers/interfaces/iauth.controller';
import { TYPES } from '../config/ioc.types';

const authRouter = Router();
const authController = container.get<IAuthController>(TYPES.IAuthController);

authRouter.post('/login', (req, res, next) => authController.login(req, res, next));

export default authRouter;
