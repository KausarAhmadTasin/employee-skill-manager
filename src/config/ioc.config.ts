import { Container } from 'inversify';
import { TYPES } from './ioc.types';

import { HealthController } from '../controllers/health.controller';

import IUnitOfService from '../services/interfaces/iunitof.service';

import UnitOfService from '../services/unitof.service';
import UnitOfWork from '../repositories/unitofwork.repository';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { ICompanyRepository } from '../repositories/interfaces/icompany.repository';
import { CompanyRepository } from '../repositories/company.repository';
import { ICompanyService } from '../services/interfaces/icompany.service';
import CompanyController from '../controllers/company.controller';
import CompanyService from '../services/company.service';
import { IAuthService } from '../services/interfaces/iauth.service';
import { AuthService } from '../services/auth.services';
import { IAuthRepository } from '../repositories/interfaces/iauth.repository';
import { AuthRepository } from '../repositories/auth.repository';
import { IAuthController } from '../controllers/interfaces/iauth.controller';
import { AuthController } from '../controllers/auth.controller';
import { AuthMiddleware } from '../middlewares/authenticate.middleware';
import { PassportConfig } from './passport.config';

const container = new Container();

container.bind<HealthController>(TYPES.HealthController).to(HealthController);

container.bind<IUnitOfService>(TYPES.IUnitOfService).to(UnitOfService);

container.bind<IUnitOfWork>(TYPES.IUnitOfWork).to(UnitOfWork);

container.bind<ICompanyRepository>(TYPES.ICompanyRepository).to(CompanyRepository);
container.bind<ICompanyService>(TYPES.ICompanyService).to(CompanyService);
container.bind<CompanyController>(TYPES.CompanyController).to(CompanyController);

container.bind<IAuthRepository>(TYPES.IAuthRepository).to(AuthRepository);
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<AuthMiddleware>(AuthMiddleware).toSelf();
container.bind<PassportConfig>(PassportConfig).toSelf();
container.bind<IAuthController>(TYPES.IAuthController).to(AuthController);

export default container;
