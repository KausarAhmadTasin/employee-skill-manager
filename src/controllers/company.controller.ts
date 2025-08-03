import { Request, Response } from 'express';
import CustomError from '../exceptions/custom-error';
import { TYPES } from '../config/ioc.types';
import IUnitOfService from '../services/interfaces/iunitof.service';
import { inject, injectable } from 'inversify';

@injectable()
export default class CompanyController {
  constructor(@inject(TYPES.IUnitOfService) private unitOfService: IUnitOfService) {}

  async createCompany(req: Request, res: Response) {
    try {
      const company = await this.unitOfService.Company.create(req?.body);
      res.status(201).json(company);
    } catch (err) {
      console.log('Error creating company:', err);
      res.status(400).json({ message: 'Failed to create company!', error: err });
    }
  }

  async getById(req: Request, res: Response) {
    const id = req?.params?.id;

    if (!id) {
      throw new CustomError('Companu ID is required', 400);
    }

    const company = await this.unitOfService.Company.findById(id);

    if (company) {
      res.status(200).json(company);
    } else {
      res.status(400).json({ message: 'Company not found' });
    }
  }

  async updateCompany(req: Request, res: Response) {
    try {
      const id = req?.params?.id;

      if (!id) {
        throw new CustomError('Company ID is required for update', 400);
      }

      const update = await this.unitOfService.Company.update(id, req?.body);

      if (update) {
        res.status(200).json({ message: 'Company updated successfully!', data: update });
      } else {
        res.status(400).json({ message: 'Company not found' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Failed to update company', error: err });
    }
  }

  async deleteCompany(req: Request, res: Response) {
    try {
      const id = req?.params?.id;

      if (!id) {
        throw new CustomError('Company ID is required for deletion', 400);
      }
      const deleted = await this.unitOfService.Company.delete(id);

      if (deleted) {
        res.status(200).json({ message: 'Company deleted successfully' });
      } else {
        res.status(400).json({ message: 'Company not found' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Failed to delete company', error: err });
    }
  }
}
