'use strict';
import * as express from 'express';
import { check } from 'express-validator/check';
import * as mail from './mail.controller';

const router = express.Router();

router.post('/inquire', [
  check('name').exists().withMessage('name is required').trim(),
  check('email').exists().withMessage('email is required').isEmail().trim().normalizeEmail().withMessage('valid email required'),
  check('message').isLength({ min: 15, max: 2056 }).withMessage('15 to 2056 characters required').trim(),
  check('subject').trim()
], mail.index);

module.exports = router;
