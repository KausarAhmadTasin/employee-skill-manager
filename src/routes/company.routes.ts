import { Router } from 'express';
import CompanyController from '../controllers/company.controller';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { AuthMiddleware } from '../middlewares/authenticate.middleware';

const companyRouter = Router();

const companyController = container.get<CompanyController>(TYPES.CompanyController);
const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware);

companyRouter.post('/registerCompany', companyController.createCompany.bind(companyController));

companyRouter.get('/:id', authMiddleware.authenticate.bind(authMiddleware), companyController.getById.bind(companyController));
companyRouter.put('/:id', authMiddleware.authenticate.bind(authMiddleware), companyController.updateCompany.bind(companyController));
companyRouter.delete('/:id', authMiddleware.authenticate.bind(authMiddleware), companyController.deleteCompany.bind(companyController));

export default companyRouter;
