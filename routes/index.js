var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.status(404);
  var err = new Error('Not Found');
  res.render('error', {
    message: err.message,
    error: {},
    title: '404 - Not Found'
  });
});

module.exports = router;
