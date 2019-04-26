'use strict';
import * as sgMail from '@sendgrid/mail';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData } from 'express-validator/filter';

sgMail.setApiKey(process.env.SENDGRID_KEY as string);

export class MailController {
  public inquire(req: Request, res: Response) {
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
        email: 'hello@braxtondiggs.com',
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
