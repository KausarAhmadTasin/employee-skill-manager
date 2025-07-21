import { PrismaClient, Company } from '@prisma/client';
// import type { Company } from '../prisma/generated';

const prisma = new PrismaClient();

export default class CompnayService {
  async create(data: Company): Promise<Company> {
    const company = await prisma.company.create({
      data,
    });

    return company;
  }

  async findById(id: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) return null;

    return company;
  }

  async update(id: string, data: Company): Promise<Company | null> {
    try {
      const updated = await prisma.company.update({
        where: { id },
        data,
      });

      return updated;
    } catch (err) {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await prisma.company.delete({
        where: { id },
      });
      return true;
    } catch (err) {
      return false;
    }
  }
}
