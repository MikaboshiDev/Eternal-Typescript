import passport from 'passport';
import { Strategy } from 'passport-discord';
import { config } from '../../src/utils/config';

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: any) => {
  done(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: config.dashboard.client_id!,
      clientSecret: config.dashboard.client_secret,
      callbackURL: config.dashboard.callback,
      scope: ['identify', 'guilds'],
    },
    (accessToken: string, refreshToken: string, profile: any, done: any) => {
      process.nextTick(async () => {
        return done(null, profile);
      });
    }
  )
);

export { passport };
