import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { CompanyRepository } from '../repositories/company.repository';
import { Company } from '../prisma/generated';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET!,
};

passport.use(
  new Strategy(opts, async (jwt_payload: IJwtPayload, done: (error: any, company?: any) => void) => {
    try {
      const compnayRepo = new CompanyRepository();
      const company: Company | null = await compnayRepo.findById(jwt_payload.id);
      if (company) return done(null, company);

      return done(null, false);
    } catch (err) {
      return done(err, false);
    }
  })
);
