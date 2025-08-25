// import { Router } from 'express';
// import CompanyController from '../controllers/company.controller';
// import container from '../config/ioc.config';
// import { TYPES } from '../config/ioc.types';
// import { AuthMiddleware } from '../middlewares/authenticate.middleware';

// const companyRouter = Router();

// const companyController = container.get<CompanyController>(TYPES.CompanyController);
// const authMiddleware = container.get<AuthMiddleware>(AuthMiddleware);

// companyRouter.post('/registerCompany', companyController.createCompany.bind(companyController));

// companyRouter.get('/:id', authMiddleware.authenticate.bind(authMiddleware), companyController.getById.bind(companyController));
// companyRouter.put('/:id', authMiddleware.authenticate.bind(authMiddleware), companyController.updateCompany.bind(companyController));
// companyRouter.delete('/:id', authMiddleware.authenticate.bind(authMiddleware), companyController.deleteCompany.bind(companyController));

// export default companyRouter;
// company.routes.ts
import { Router } from 'express';
import CompanyController from '../controllers/company.controller';
import { AuthMiddleware } from '../middlewares/authenticate.middleware';

export const createCompanyRouter = (controller: CompanyController, auth: AuthMiddleware) => {
  const router = Router();

  router.post('/registerCompany', controller.createCompany.bind(controller));
  router.get('/:id', controller.getById.bind(controller));
  router.put('/:id', auth.authenticate.bind(auth), controller.updateCompany.bind(controller));
  router.delete('/:id', auth.authenticate.bind(auth), controller.deleteCompany.bind(controller));

  return router;
};
