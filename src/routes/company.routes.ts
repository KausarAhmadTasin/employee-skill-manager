import { Router } from 'express';
import CompanyController from '../controllers/company.controller';

const compnayRouter = Router();
const companyController = new CompanyController();

compnayRouter.get('/:id', companyController.getById);
compnayRouter.post('/', companyController.createCompany);
compnayRouter.put('/:id', companyController.updateCompany);
compnayRouter.delete('/:id', companyController.createCompany);

export default compnayRouter;
