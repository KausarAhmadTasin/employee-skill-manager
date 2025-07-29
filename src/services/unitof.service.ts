import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { ICompanyService } from './interfaces/icompany.service';
import IUnitOfService from './interfaces/iunitof.service';
import { IUserService } from './interfaces/iuser.service';

export default class UnitOfService implements IUnitOfService {
  public User: IUserService;
  public Compnay: ICompanyService;
  constructor(user = container.get<IUserService>(TYPES.IUserService)) {
    this.User = user;
  }
}
