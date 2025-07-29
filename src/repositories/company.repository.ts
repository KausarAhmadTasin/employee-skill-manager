import prisma from '../prisma';
import { Company } from '../prisma/generated';
import { ICompanyRepository } from './interfaces/icompany.repository';

export class CompanyRepository implements ICompanyRepository {
  async findById(id: string): Promise<Company | null> {
    return prisma.company.findUnique({
      where: { id },
    });
  }

  async create(data: Company): Promise<Company> {
    return prisma.company.create({
      data,
    });
  }

  async update(id: string, data: Company): Promise<Company> {
    return prisma.company.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Company> {
    return prisma.company.delete({
      where: { id },
    });
  }
}
