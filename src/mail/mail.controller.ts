'use strict';
import * as express from 'express';
import { validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';
import * as sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_KEY as string);

export function index(req: express.Request, res: express.Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.mapped() });
  }
  const data = matchedData(req);
  sgMail.send({
    to: {
      name: 'Braxton Diggs',
      email: 'braxtondiggs@gmail.com'
    },
    from: {
      name: data.name,
      email: data.email
    },
    subject: data.subject ? data.subject : 'Message from BraxtonDiggs.com',
    text: data.message
  }).then(() => {
    return res.json({ status: true, msg: 'Message sent successfully' });
  }).catch((error: any) => {
    return res.status(500).json({ error });
  });
}
