import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}
// CONTROLLER FUNCTION FOR USER LOGIN

const loginUser = async (req, res) => {
    try{
        const {email,password} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){ 
            const token = createToken(user._id)
            res.json({success:true, token})
        }else {
            resizeBy.json({success:false, message:"Invalid Credentials "})
        }
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
        
    }
};

// CONTROLLER FUNCTION FOR USER REGISTER

const registerUser = async (req, res) => {
    try{
        const {name,email,password} = req.body
        // checking if user already exist
        const exist = await userModel.findOne({email})
        if(exist){
            return res.json({success:false, message:"User already exist"})
             // 另外一个写法
            // return res.status(400).send({message:"User already exist"})
        }
        //validate password and checking password strength
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Password enter a valid email"})
        }
        if(password.length < 8){
            return res.json({success:false, message:"Password must be at least 8 characters"})
        }

        // hashing user password

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user = await newUser.save()
        const token = createToken(user._id)
        res.json({success:true, token})
    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
};

// CONTROLLER FUNCTION FOR ADMIN LOGIN

const adminLogin = async (req, res) => {
    try{
        const {email,password} = req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email + password,process.env.JWT_SECRET)
            res.json({success:true, token})
        }else {
            res.json({success:false, message:"Invalid Credentials"})
        }
    }catch(error){
        res.json({success:false, message:error.message})
    }
};

export { loginUser, registerUser, adminLogin };