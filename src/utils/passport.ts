import { Strategy } from 'passport-discord';
import passport from 'passport';
import 'dotenv/config';
import fs from 'fs';

passport.serializeUser((user: any, done: any) => {
   done(null, user);
});

passport.deserializeUser((obj: any, done: any) => {
   done(null, obj);
});

passport.use(
   new Strategy(
      {
         clientID: process.env.client_id!,
         clientSecret: process.env.client_secret!,
         callbackURL: process.env.callback_url!,
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
