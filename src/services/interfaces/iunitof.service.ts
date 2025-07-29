import { ICompanyService } from './icompany.service';
import { IUserService } from './iuser.service';

export default interface IUnitOfService {
  User: IUserService;
  Company: ICompanyService;
}
