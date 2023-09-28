import cookieParser from 'cookie-parser';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import path from 'node:path';
import swaggerUi from 'swagger-ui-express';
import swaggerSetup from '../src/functions/modules/swaggers';
import { logWithLabel } from '../src/utils/console';
import { passport } from './utils/passport';
import { router } from './utils/request';

export class ExpressServer {
  app: any;
  constructor() {
    this.app = express();
    this.app.use(cookieParser());

    this.setupRoutes();
    this.setMiddleware();
  }

  private setMiddleware() {
    this.app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerSetup));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(passport.initialize());
    this.app.set('view engine', 'ejs');
    this.app.use(passport.session());
    this.app.use(express.json());
    this.app.use(morgan('dev'));
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
    const staticDirs = ['css', 'js', 'fonts', 'images', 'svg'];

    staticDirs.forEach((dir) => {
      const staticPath = path.join(__dirname, `views/public/${dir}`);
      this.app.use(`/${dir}`, express.static(staticPath));
    });
  }
}
