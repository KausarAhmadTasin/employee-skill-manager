import { CompanyRepository } from '../../../src/repositories/company.repository';
import prisma from '../../../src/prisma';

jest.mock('../../../src/prisma', () => ({
  company: {
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('CompanyRepository', () => {
  let repo: CompanyRepository;

  beforeEach(() => {
    repo = new CompanyRepository();
    jest.clearAllMocks(); 
  });

  it('findById → calls prisma.findUnique', async () => {
    (prisma.company.findUnique as jest.Mock).mockResolvedValue({ id: '1', name: 'Test' });

    const result = await repo.findById('1');

    expect(prisma.company.findUnique).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual({ id: '1', name: 'Test' });
  });

  it('create → calls prisma.create', async () => {
    (prisma.company.create as jest.Mock).mockResolvedValue({ id: '1', name: 'Test' });

    const result = await repo.create({ id: '1', name: 'Test' } as any);

    expect(prisma.company.create).toHaveBeenCalledWith({ data: { id: '1', name: 'Test' } });
    expect(result).toEqual({ id: '1', name: 'Test' });
  });

  it('update → calls prisma.update', async () => {
    (prisma.company.update as jest.Mock).mockResolvedValue({ id: '1', name: 'Updated' });

    const result = await repo.update('1', { id: '1', name: 'Updated' } as any);

    expect(prisma.company.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { id: '1', name: 'Updated' },
    });
    expect(result).toEqual({ id: '1', name: 'Updated' });
  });

  it('delete → calls prisma.delete', async () => {
    (prisma.company.delete as jest.Mock).mockResolvedValue({ id: '1' });

    const result = await repo.delete('1');

    expect(prisma.company.delete).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(result).toEqual({ id: '1' });
  });
});
