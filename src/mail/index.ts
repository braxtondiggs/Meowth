'use strict';
import { Router } from 'express';
import { check } from 'express-validator/check';
import MailController from './mail.controller';

export class MailRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.inquire();
  }
  private inquire() {
    this.router.post('/inquire', [
      check('name').exists().withMessage('name is required').trim(),
      check('email').exists().withMessage('email is required')
        .isEmail().trim().normalizeEmail().withMessage('valid email required'),
      check('message').isLength({ min: 15, max: 2056 }).withMessage('15 to 2056 characters required').trim(),
      check('subject').trim()
    ], MailController.inquire);
  }
}

export default new MailRouter().router;
