import userModel from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


async function registerUser(req, res){

    const {username , email , password} = req.body
    if(!username || !email || !password){
        throw new Error("Username  , email and password are required ")
    }
    const isUserExists = await userModel.findOne({ $or: [{ email: email }, { username: username }] })
    if(isUserExists){
        throw new Error("Username and email should be unique")
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const user = await userModel.create({
        username , 
        email , 
        password : hashedPassword
    })

    const token = jwt.sign({
        id:user._id
    } , process.env.JWT_SECRET)

    res.status(200).json({
        message : "User Register succesfully",
        data : user,
        token
    })
}

async function loginUser(req, res){
    const {username , email , password} = req.body
    if(!email || !password){
        throw new Error("Email and password are required")
    }

    const user = await userModel.findOne({email : email})

    if(!user){
        throw new Error("Email or password is incorrect")
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        throw new Error("Incorrect Password")
    }
    const token = jwt.sign({
        id: user._id
    } , process.env.JWT_SECRET)

    res.status(200).json({
        message : "Logged in successfully",
        data : user,
        token
    })

}

async function logoutUser(req , res){
    res.clearCookie("token")
    res.status(200).json({
        message : "Logged out successfully"
    })
}


export default {
    registerUser,
    loginUser,
    logoutUser
}