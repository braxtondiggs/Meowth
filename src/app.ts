'use strict';
import * as cors from 'cors';
import * as express from 'express';
import MailRouter from './mail';

class App {
  public express: express.Application;
  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(cors());
    this.express.options('*', cors());
  }

  private routes(): void {
    this.express.use('/api/mail', MailRouter);
  }
}
export default new App().express;
