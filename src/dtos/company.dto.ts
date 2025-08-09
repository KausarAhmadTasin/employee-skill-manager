export interface CompanyDto {
  id: string;
  name: string;
  email: string;
  hashedPassword: string;
  createdAt: Date | null;
  updatedAt: Date | null;
}
