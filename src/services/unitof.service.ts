import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { ICompanyService } from './interfaces/icompany.service';
import IUnitOfService from './interfaces/iunitof.service';
import { IUserService } from './interfaces/iuser.service';

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Company: ICompanyService;
  constructor(user = container.get<IUserService>(TYPES.IUserService), company = container.get<ICompanyService>(TYPES.ICompanyService)) {
    this.User = user;
    this.Company = company;
  }
}
