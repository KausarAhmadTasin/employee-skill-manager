import { Request, Response } from 'express';
import CompanyController from '../../../src/controllers/company.controller';

describe('CompanyController', () => {
  let controller: CompanyController;
  let mockUnitOfService: any;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;

  beforeEach(() => {
    mockUnitOfService = {
      Company: {
        create: jest.fn(),
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    controller = new CompanyController(mockUnitOfService);

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('createCompany → success', async () => {
    const fakeCompany = { id: '1', name: 'Test' };
    mockUnitOfService.Company.create.mockResolvedValue(fakeCompany);

    mockReq = { body: { name: 'Test' } };

    await controller.createCompany(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(fakeCompany);
  });

  it('getById → not found', async () => {
    mockUnitOfService.Company.findById.mockResolvedValue(null);
    mockReq = { params: { id: '123' } };

    await controller.getById(mockReq as Request, mockRes as Response);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ message: 'Company not found' });
  });
});
