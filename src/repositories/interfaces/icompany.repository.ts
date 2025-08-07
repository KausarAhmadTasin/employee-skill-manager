import { Company } from '../../prisma/generated';

export interface ICompanyRepository {
  findById(id: string): Promise<Company | null>;

  create(data: Company): Promise<Company | null>;

  update(id: string, data: Company): Promise<Company | null>;

  delete(id: string): Promise<Company | null>;
}
