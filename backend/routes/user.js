const express = require('express')

// controller functions
const {
    signupUser, 
    loginUser, 
    userList
} = require('../controllers/userController')


const router = express.Router()

// userList route
router.get('/', userList)

//login routes
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

module.exports= router