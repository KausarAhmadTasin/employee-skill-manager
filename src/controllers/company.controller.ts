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
    const id = Number(req?.params?.id) || '';

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
}
