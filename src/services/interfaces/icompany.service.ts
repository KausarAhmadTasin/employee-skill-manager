import { CompanyDto } from '../../dtos/company.dto';
import { CompanyModel } from '../../models/company.model';

export interface ICompanyService {
  findById(id: string): Promise<CompanyDto | null>;

  create(data: CompanyModel, role: )
}
