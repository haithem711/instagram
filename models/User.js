const mongoose=require('mongoose')
const {ObjectId}= mongoose.Schema.Types
const UserSchema=new mongoose.Schema({
 
     name: { type:String,
              required:true
            },
     email : { type:String,
                required:true
              },
     password : { type:String,
                required:true
              },
              pic:{
      type:String,
      default:'https://res.cloudinary.com/dw9j1appv/image/upload/v1592939233/59032614de56cNo-image-available_azeggv.jpg'
              } ,
              followers:[{type:ObjectId,ref:'User'}],
              following:[{type:ObjectId,ref:'User'}]

    
  })
  mongoose.model("User",UserSchema)