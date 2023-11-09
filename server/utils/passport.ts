import 'dotenv/config';
import passport from 'passport';
import { Strategy } from 'passport-discord';

passport.serializeUser((user: any, done: any) => {
  done(null, user);
});

passport.deserializeUser((obj: any, done: any) => {
  done(null, obj);
});

passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENTID!,
      clientSecret: process.env.CLIENTSECRET!,
      callbackURL: process.env.CALLBACK!,
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
