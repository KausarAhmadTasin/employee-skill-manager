import { Company } from '../../prisma/generated';

export interface IAuthRepository {
  findCompanyByEmail(email: string): Promise<Company | null>;
  findCompanyById(id: string): Promise<Company | null>;
}
