const mongoose=require('mongoose');
const Joi=require('joi');
const Schema=mongoose.Schema;

const userSchema= new Schema({

 name:{
    type: String,
    required:true
 },
 password:{
  type:String,
  required:true
 },
 isAdmin:{
   type:Boolean,
   required:true
 }
})


module.exports=mongoose.model('User',userSchema);


