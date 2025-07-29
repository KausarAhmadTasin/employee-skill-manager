import { Router } from 'express';
import CompanyController from '../controllers/company.controller';
import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';

const compnayRouter = Router();

const companyController = container.get<CompanyController>(TYPES.CompanyController);

compnayRouter.get('/:id', companyController.getById);
compnayRouter.post('/', companyController.createCompany);
compnayRouter.put('/:id', companyController.updateCompany);
compnayRouter.delete('/:id', companyController.createCompany);

export default compnayRouter;
