import { Prisma } from '../../prisma/generated';
import { ICompanyRepository } from './icompany.repository';

export default interface IUnitOfWork {
  Company: ICompanyRepository;

  /**
   * Executes a set of operations within a database transaction.
   *
   * @param callback - A function that receives a Prisma transaction client and performs database operations.
   * @returns A promise that resolves to the result of the transaction.
   */
  transaction<T>(callback: (prisma: Prisma.TransactionClient) => Promise<T>): Promise<T>;
}
