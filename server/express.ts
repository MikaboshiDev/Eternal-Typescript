import { logWithLabel } from '../src/utils/console';
import { passport } from '../src/utils/passport';
import swaggerSetup from '../src/docs/swaggers';
import { router } from '../src/utils/request';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';
import path from 'node:path';
import morgan from 'morgan';
import { logMiddleware } from './middleware/logs.middlware';

export class ExpressServer {
   app: any;
   constructor() {
      this.app = express();
      this.app.use(cookieParser());

      this.setupRoutes();
      this.setMiddleware();
   }

   private setMiddleware() {
      this.app.use(
         '/documentation',
         swaggerUi.serve,
         swaggerUi.setup(swaggerSetup)
      );
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(passport.initialize());
      this.app.set('view engine', 'ejs');
      this.app.use(passport.session());
      this.app.use(express.json());
      this.app.use(morgan('dev'));
      this.app.use(logMiddleware);
      this.app.use(router);
   }

   public start(port: number) {
      this.app.listen(port, () => {
         logWithLabel('express', `Express server started on port ${port}`);
      });
   }

   setupRoutes() {
      this.app.use(
         session({
            secret: `manager.dashboard.io`,
            resave: false,
            saveUninitialized: false,
         })
      );

      this.app.set('views', path.join(__dirname, 'views'));
      const staticDirs = ['css', 'js', 'fonts', 'images'];

      staticDirs.forEach((dir) => {
         const staticPath = path.join(__dirname, `views/public/${dir}`);
         this.app.use(`/${dir}`, express.static(staticPath));
      });
   }
}
