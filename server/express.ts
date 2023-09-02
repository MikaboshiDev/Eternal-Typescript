import { logWithLabel } from '../src/utils/console';
import { passport } from '../src/utils/passport';
import { router } from '../src/utils/request';
import swaggerSetup from '../src/docs/swaggers';
import swaggerUi from 'swagger-ui-express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import express from 'express';

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
      this.app.use(passport.session());
      this.app.use(express.json());
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
   }
}
