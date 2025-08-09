import { Company } from '../prisma/generated';
import { IAuthRepository } from './interfaces/iauth.repository';
import prisma from '../prisma';

export class AuthRepository implements IAuthRepository {
  async findCompanyByEmail(email: string): Promise<Company | null> {
    return prisma.company.findUnique({
      where: { email },
    });
  }

  async findCompanyById(id: string): Promise<Company | null> {
    return prisma.company.findUnique({
      where: { id },
    });
  }
}
