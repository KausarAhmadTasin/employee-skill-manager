import { ICompanyService } from './icompany.service';
import { IUserService } from './iuser.service';

export default interface IUnitOfService {
  Company: ICompanyService;
}
