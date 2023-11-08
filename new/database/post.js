const mongoose = require('mongoose');
const Schema = mongoose.Schema 


  
var Post = new Schema({ 
    username:{
        type: String 
    },
    image:
    {
        data: Buffer,
        contentType: String
    },
    content: { 
        type: String 
    }, 
    likes: { 
        type: Number 
    },
    }) 
  
  
module.exports = mongoose.model('Post', Post)