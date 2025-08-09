import { ExtractJwt, Strategy } from 'passport-jwt';
import { IAuthService } from '../services/interfaces/iauth.service';
import passport from 'passport';
import { inject, injectable } from 'inversify';
import { TYPES } from './ioc.types';

@injectable()
export class PassportConfig {
  // constructor(private authService: IAuthService) {}
  constructor(@inject(TYPES.IAuthService) private authService: IAuthService) {
    this.initialize();
  }

  private initialize(): void {
    const otps = {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // secretOrKey: process.env.JWT_SECRET!,
      secretOrKey: process.env.JWT_SECRET as string,
    };

    passport.use(
      new Strategy(otps, async (jwtPayload, done) => {
        try {
          const company = await this.authService.findCompanyById(jwtPayload.id);
          if (company) {
            return done(null, company);
          }
          return done(null, false);
        } catch (err) {
          return done(err, false);
        }
      })
    );
  }
}
