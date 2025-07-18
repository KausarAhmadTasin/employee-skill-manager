import { PrismaClient } from '@prisma/client';
import { Company } from '../prisma/generated';

const prisma = new PrismaClient();

export default class CompnayService {
  async create(data: Company): Promise<Company> {
    const company = await prisma.company.create({
      data,
    });

    return company;
  }
  async findById(id: number): Promise<Company | null> {
    const compnay = await prisma.company.findById(id);
    if (!compnay) return null;

    return compnay;
  }
}
