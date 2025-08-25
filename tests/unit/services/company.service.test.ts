import CompanyService from '../../../src/services/company.service';
import bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('CompanyService', () => {
  let service: CompanyService;
  let mockUoW: any;

  beforeEach(() => {
    mockUoW = {
      Company: {
        findById: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
      transaction: jest.fn((fn) =>
        fn({
          company: {
            create: jest.fn().mockResolvedValue({ id: '1', name: 'Test', email: 't@test.com', hashedPassword: 'hashed' }),
          },
        })
      ),
    };

    service = new CompanyService(mockUoW);
  });

  it('create → hashes password and creates company', async () => {
    (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPass');
    const data = { name: 'Test', email: 't@test.com', hashedPassword: '123' } as any;

    const result = await service.create(data);

    expect(bcrypt.hash).toHaveBeenCalledWith('123', 10);
    expect(result).toMatchObject({ name: 'Test', email: 't@test.com' });
  });

  it('findById → returns DTO', async () => {
    mockUoW.Company.findById.mockResolvedValue({
      id: '1',
      name: 'Test',
      email: 't@test.com',
      hashedPassword: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.findById('1');

    expect(result?.name).toBe('Test');
  });

  it('update → updates company', async () => {
    mockUoW.Company.update.mockResolvedValue({
      id: '1',
      name: 'Updated',
      email: 't@test.com',
      hashedPassword: 'hashed',
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await service.update('1', { name: 'Updated', email: 't@test.com', hashedPassword: 'hashed' } as any);

    expect(result?.name).toBe('Updated');
  });

  it('delete → deletes company', async () => {
    mockUoW.Company.delete.mockResolvedValue({ id: '1', name: 'Test' });

    const result = await service.delete('1');

    expect(result?.id).toBe('1');
  });
});
