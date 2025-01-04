const User = require('../models/userModel')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// generate tokens for loginUser and signupUser controller functions
const createToken = (_id) =>{
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '3d'})
}


// login user
const loginUser = async(req, res) =>{
    res.json({mssg: 'login user'})
}

// signup user

const signupUser = async(req, res) =>{

    const {email, password} = req.body //grab the email and password from request body

    try{
        const user = await User.signup(email,password)

        //create a token
        const token = createToken(user._id)
        res.status(200).json({email, token})

    }catch(error){
        res.status(400).json({error: error.message})
    }
}



// get all users
const userList= async(req,res)=>{
    const user = await User.find({}).sort({createsAt: -1})
    res.status(200).json(user)
}

module.exports = {signupUser, loginUser, userList}
