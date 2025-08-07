import { inject, injectable } from 'inversify';
import { TYPES } from '../config/ioc.types';
import IUnitOfWork from '../repositories/interfaces/iunitofwork.repository';
import bcrypt from 'bcrypt';

@injectable()
export default class AuthService {
  constructor(@inject(TYPES.IUnitOfWork) private unitOfWork: IUnitOfWork) {}

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = {
      name,
      email,
      hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const company = await this.unitOfWork.Company.create(data);
  }
}
