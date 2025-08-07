// import type { Company } from '../prisma/generated';

import { inject, injectable } from 'inversify';
import { ICompanyService } from './interfaces/icompany.service';
import { TYPES } from '../config/ioc.types';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import { CompanyDto } from '../dtos/company.dto';
import { Company } from '../prisma/generated';

@injectable()
export default class CompanyService implements ICompanyService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async findById(id: string): Promise<CompanyDto | null> {
    const company = await this.unitOfWork.Company.findById(id);

    if (!company) {
      return null;
    }

    return this.convertToDto(company);
  }

  async create(data: Company): Promise<CompanyDto | null> {
    return this.unitOfWork.transaction(async (transactionClient) => {
      const company = await transactionClient.company.create({
        data: {
          name: data.name,
          email: data.email,
          hashedPassword: data.hashedPassword,
        },
      });

      return this.convertToDto(company);
    });
  }

  async update(id: string, data: CompanyDto): Promise<CompanyDto | null> {
    const company = await this.unitOfWork.Company.update(id, {
      ...data,
    });

    if (!company) {
      return null;
    }

    return this.convertToDto(company);
  }

  async delete(id: string): Promise<CompanyDto | null> {
    const company = await this.unitOfWork.Company.delete(id);

    if (!company) {
      return null;
    }

    return this.convertToDto(company);
  }

  private convertToDto(company: Company): CompanyDto {
    return {
      id: company.id,
      name: company.name,
      email: company.email,
      hashedPassword: company.hashedPassword,
      updatedAt: company.updatedAt,
      createdAt: company.createdAt,
    };
  }
}
