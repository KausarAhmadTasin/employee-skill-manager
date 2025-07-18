import { Router } from 'express';
import CompanyController from '../controllers/company.controller';

const compnayRouter = Router();
const companyController = new CompanyController();

compnayRouter.get('/:id', companyController.getById);
compnayRouter.post('/', companyController.createCompany);

export default compnayRouter;
