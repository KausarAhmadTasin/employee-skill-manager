import { CompanyDto } from '../../dtos/company.dto';
import { Company } from '../../prisma/generated';

export interface ICompanyService {
  findById(id: string): Promise<CompanyDto | null>;

  create(data: Company): Promise<CompanyDto | null>;

  update(id: string, data: CompanyDto): Promise<CompanyDto | null>;

  delete(id: string): Promise<CompanyDto | null>;
}
