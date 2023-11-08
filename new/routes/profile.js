var express = require('express');
const User = require("../database/user")
const Post = require("../database/post")
var router = express.Router();

var fs = require('fs');
var path = require('path');
var multer = require('multer');
 
var storage = multer.diskStorage({
 
  destination: function(req,file,cb){
      cb(null,'uploads');
  },
  
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
 
var upload = multer({ storage: storage });
 



/* GET users listing. */
router.get('/profile', function(req, res, next) {
  const username = req.query.username;
  if (username) {
    const userPosts = Post.find({ username: username });
    res.render('profile',{username, userPosts});
  } else {
    res.redirect('/login'); 
  }
  
});


 
router.post('/profile', upload.single('image'), (req, res, next) => {
  console.log('File Path:', path.join(__dirname, '/uploads/', req.file.filename));
  const post =  Post.create({ 
      username:req.body.username,
      image: {
        data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
        contentType: 'image/jpg'
      },
      content: req.body.content,
      likes:0
  });
  const username=req.body.username;
  if (username) {
    res.render('profile',{username});
  } else {
    res.redirect('/login'); 
  }
  }); 
 
module.exports = router;
