const User = require('../models/userModel')

// login user
const loginUser = async(req, res) =>{
    res.json({mssg: 'login user'})
}

// signup user

const signupUser = async(req, res) =>{

    const {email, password} = req.body //grab the email and password from request body

    try{
        const user = await User.signup(email,password)
        res.status(200).json({email, user})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser}