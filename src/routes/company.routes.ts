import { Router } from 'express';
import CompanyController from '../controllers/company.controller';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';

const companyRouter = Router();

const companyController = container.get<CompanyController>(TYPES.CompanyController);

companyRouter.get('/:id', companyController.getById.bind(companyController));
companyRouter.post('/registerCompany', companyController.createCompany.bind(companyController));
companyRouter.put('/:id', companyController.updateCompany.bind(companyController));
companyRouter.delete('/:id', companyController.deleteCompany.bind(companyController));

export default companyRouter;
