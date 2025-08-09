import { Company } from '../../prisma/generated';

export interface IAuthService {
  validateCompany(email: string, password: string): Promise<Company | null>;

  generateToken(company: Company): Promise<string>;

  findCompanyById(id: string): Promise<Company | null>;
}
