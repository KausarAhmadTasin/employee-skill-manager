import { Request, Response } from 'express';
import CompanyController from '../../../src/controllers/company.controller';

const mockUnitOfService = {
  create: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const mockController = new CompanyController(mockUnitOfService as any);

mockController.createCompany = jest.fn(async (req: Request, res: Response) => {
  res.status(201).json({ id: '1', name: 'TestCo', email: 'test@test.com' });
});

mockController.getById = jest.fn(async (req: Request, res: Response) => {
  res.status(200).json({ id: '1', name: 'TestCo', email: 'test@test.com' });
});

mockController.updateCompany = jest.fn(async (req: Request, res: Response) => {
  res.status(200).json({
    message: 'Company updated successfully!',
    data: { id: '1', name: 'UpdatedCo' },
  });
});

mockController.deleteCompany = jest.fn(async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Company deleted successfully' });
});

const mockAuth = {
  authenticate: jest.fn((req: Request, res: Response, next: Function) => next()),
};

import express, { Application } from 'express';
import request from 'supertest';
import { createCompanyRouter } from '../../../src/routes/company.routes';

const companyRouter = createCompanyRouter(mockController, mockAuth);

describe('Company Routes', () => {
  let app: Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/company', companyRouter);
  });

  it('should create a company', async () => {
    const res = await request(app).post('/company/registerCompany').send({ name: 'TestCo', email: 'test@test.com' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id', '1');
    expect(mockController.createCompany).toHaveBeenCalled();
  });

  it('should get a company by id', async () => {
    const res = await request(app).get('/company/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('name', 'TestCo');
    expect(mockController.getById).toHaveBeenCalled();
  });

  it('should update a company', async () => {
    const res = await request(app).put('/company/1').send({ name: 'UpdatedCo' });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Company updated successfully!');
    expect(mockController.updateCompany).toHaveBeenCalled();
  });

  it('should delete a company', async () => {
    const res = await request(app).delete('/company/1');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Company deleted successfully');
    expect(mockController.deleteCompany).toHaveBeenCalled();
  });
});
