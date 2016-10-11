var cors = require('cors');
var sendgrid = require('sendgrid').mail;
var sg = require('sendgrid')(process.env.SENDGRID_KEY);
var express = require('express');
var router = express.Router();
router.options('/', cors());

router.post('/', cors(), function(req, res) {
  req.checkBody('name', 'name is required').notEmpty();
  req.checkBody('email', 'email is required').notEmpty();
  req.checkBody('email', 'valid email required').isEmail();
  req.checkBody('message', 'message is required').notEmpty();
  req.checkBody('message', '15 to 2056 characters required').len(15, 2056);
  var errors = req.validationErrors();
  if (errors) {
    res.status(400).send({
      status: false
    });
  } else {
    var from_email = new sendgrid.Email('app57623256@heroku.com', 'Heroku App');
    var to_email = new sendgrid.Email('braxtondiggs@gmail.com', 'Braxton Diggs');
    var reply_email = new sendgrid.Email(req.body.email, req.body.name);
    var subject = 'Message from BraxtonDiggs.com';
    var content = new sendgrid.Content('text/plain', req.body.message);
    var mail = new sendgrid.Mail(from_email, subject, to_email, content);
    mail.setReplyTo(reply_email)

    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      res.send({
        status: true
      });
    });
  }
});

module.exports = router;
