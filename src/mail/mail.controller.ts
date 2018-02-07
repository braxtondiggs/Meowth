'use strict';
import * as sgMail from '@sendgrid/mail';
import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';

sgMail.setApiKey(process.env.SENDGRID_KEY as string);

export class MailController {
  public inquire(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }
    const data = matchedData(req);
    sgMail.send({
      from: {
        email: data.email,
        name: data.name
      },
      subject: data.subject ? data.subject : 'Message from BraxtonDiggs.com',
      text: data.message,
      to: {
        email: 'braxtondiggs@gmail.com',
        name: 'Braxton Diggs'
      }
    }).then(() => {
      return res.json({ status: true, msg: 'Message sent successfully' });
    }).catch((error: any) => {
      return res.status(500).json({ error });
    });
  }
}

export default new MailController();
