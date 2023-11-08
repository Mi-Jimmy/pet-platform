var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/contact', function(req, res, next) {
  const username = req.query.username;
  if (username) {
    res.render('contact',{username});
  } else {
    res.redirect('/login'); 
  }
});

module.exports = router;
