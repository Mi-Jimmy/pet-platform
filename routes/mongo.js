const mongoose = require('mongoose');
const Schema = mongoose.Schema 


mongoose
  .connect('mongodb://127.0.0.1/test')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.log(err));

  
var User = new Schema({ 
    username: { 
        type: String 
    }, 
    password: { 
        type: String 
    } 
    }) 
  
  
module.exports = mongoose.model('User', User)