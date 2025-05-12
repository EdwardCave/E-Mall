import mongoose from "mongoose";    

const userChema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    cartData:{type:Object,default:{}}
},{minimized:false})

const userModel = mongoose.models.user || mongoose.model("user",userChema)

export default userModel