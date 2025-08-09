import container from '../config/ioc.config';
import { TYPES } from '../config/ioc.types';
import { ICompanyService } from './interfaces/icompany.service';
import IUnitOfService from './interfaces/iunitof.service';

export default class UnitOfService implements IUnitOfService {
  public Company: ICompanyService;
  constructor(company = container.get<ICompanyService>(TYPES.ICompanyService)) {
    this.Company = company;
  }
}
