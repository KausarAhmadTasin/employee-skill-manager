import express from 'express';
import healthRouter from './health.routes';
import authRouter from './auth.route';
import container from '../config/ioc.config';
import CompanyController from '../controllers/company.controller';
import { TYPES } from '../config/ioc.types';
import { AuthMiddleware } from '../middlewares/authenticate.middleware';
import { createCompanyRouter } from './company.routes';

const companyController = container.get<CompanyController>(TYPES.CompanyController);
const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware);

const routes = express.Router();

routes.use('/health', healthRouter);
routes.use('/company', createCompanyRouter(companyController, authMiddleware));
routes.use('/auth', authRouter);

export default routes;
