export const TYPES = {
  HealthController: Symbol.for('HealthController'),
  UserController: Symbol.for('UserController'),
  AccountController: Symbol.for('AccountController'),

  IUnitOfService: Symbol.for('IUnitOfService'),
  IUserService: Symbol.for('IUserService'),

  IUnitOfWork: Symbol.for('IUnitOfWork'),
  IUserRepository: Symbol.for('IUserRepository'),
  ICompanyRepository: Symbol.for('ICompanyRepository'),
  ICompanyService: Symbol.for('ICompanyService'),
  CompanyController: Symbol.for('CompanyController'),
};
