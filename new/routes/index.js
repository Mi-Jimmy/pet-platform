var express = require('express');
const User = require("../database/user")
var router = express.Router();

/* GET home page. */

router.get("/", function (req, res) { 
  res.render("index"); 
}); 


router.get("/register", function (req, res) { 
  res.render("register"); 
}); 

// Handling user signup 
router.post("/register", async (req, res) => { 
  const user = await User.create({ 
    username: req.body.username, 
    password: req.body.password 
  }); 
  
  res.render("index"); 
}); 

//Showing login form 
router.get("/login", function (req, res) { 
  res.render("login"); 
}); 

//Handling user login 
router.post("/login", async function(req, res){ 
  try { 
      // check if the user exists 
      const user = await User.findOne({ username: req.body.username }); 
      if (user) { 
        //check if password matches 
        const result = req.body.password === user.password; 
        if (result) { 
          const username = req.body.username;
          res.redirect(`/profile?username=${username}`); 
        } else { 
          res.status(400).json({ error: "password doesn't match" }); 
        } 
      } else { 
        res.status(400).json({ error: "User doesn't exist" }); 
      } 
    } catch (error) { 
      res.status(400).json({ error }); 
    } 
}); 

//Handling user logout  
router.get("/home", function (req, res) { 
  res.render("index"); 
}); 

function isLoggedIn(req, res, next) { 
  if (req.isAuthenticated()) return next(); 
  res.redirect("/login"); 
} 


module.exports = router;
