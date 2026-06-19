import userModel from "../models/auth.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'


async function registerUser(req, res){

    const {username , email , password} = req.body
    if(!username || !email || !password){
        return res.status(400).json({
            error : "Username  , email and password are required "
        })
    }
    const isUserExists = await userModel.findOne({$or:[{username: username},{email : email}]})
    if(isUserExists){
        return res.status(400).json({
            error: "username and email should be unique"
        })
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

    res.cookie("token", token , {
        httpOnly : true
    })

    res.status(200).json({
        message : "User Register succesfully",
    })
}

async function loginUser(req, res){
    const {username , email , password} = req.body
    if((!username && !email) || !password){
        return res.status(400).json({
            error : "Username  , Email and password are required"
        })
    }

    const user = await userModel.findOne({$or:[{username : username}, {email : email}]})

    if(!user){
        return res.status(404).json({
            error : "User does not exists"
        })
    }

    const isPasswordValid = await bcrypt.compare(password , user.password)

    if(!isPasswordValid){
        return res.status(404).json({
            error : "Unauthorized Password"
        })
    }
    const token = jwt.sign({
        id: user._id
    } , process.env.JWT_SECRET)

    res.cookie("token" , token)

    res.status(200).json({
        message : "Logged in successfully"
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