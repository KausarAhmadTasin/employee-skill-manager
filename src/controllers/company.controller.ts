import { Request, Response } from 'express';
import CustomError from '../exceptions/custom-error';
import CompnayService from '../services/company.service';

const compnayService = new CompnayService();

export default class CompanyController {
  async createCompany(req: Request, res: Response) {
    try {
      const company = compnayService.create(req?.body);
      res.status(201).json(company);
    } catch (err) {
      res.status(400).json({ message: 'Failed to create company!', error: err });
    }
  }

  async getById(req: Request, res: Response) {
    const id = req?.params?.id;

    if (!id) {
      throw new CustomError('Companu ID is required', 400);
    }

    const company = await compnayService.findById(id);

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

      const update = await compnayService.update(id, req?.body);

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
      const deleted = await compnayService.delete(id);

      if (deleted) {
        res.status(200).json({ message: 'Company deleted successfully' });
      } else {
        res.status(404).json({ message: 'Company not found' });
      }
    } catch (err) {
      res.status(400).json({ message: 'Failed to delete company', error: err });
    }
  }
}
