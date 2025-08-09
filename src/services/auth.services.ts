import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import { IAuthRepository } from '../repositories/interfaces/iauth.repository';
import { Company } from '../prisma/generated';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

@injectable()
export class AuthService {
  constructor(@inject(TYPES.IAuthRepository) private authRepository: IAuthRepository) {}

  async validateCompany(email: string, password: string): Promise<Company | null> {
    const company = await this.authRepository.findCompanyByEmail(email);
    if (!company) {
      return null;
    }

    const isValid = await bcrypt.compare(password, company.hashedPassword);
    return isValid ? company : null;
  }

  async generateToken(company: Company): Promise<string> {
    const payload = { id: company.id, email: company.email };

    return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
  }

  async findCompanyById(id: string): Promise<Company | null> {
    return this.authRepository.findCompanyById(id);
  }
}
