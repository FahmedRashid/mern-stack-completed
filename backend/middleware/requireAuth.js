const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const requireAuth = async (req, res, next) =>{

    // verify Authentication for each users
    const { authorization } = req.headers 

    if(!authorization){
        return res.status(401).json({error: 'Authorization token required'})
    }
// spliting the token from the headers. ' ' - the space is where the split is happening and [1] i want the value of 1 in the array not the [0]
    const token = authorization.split(' ')[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)

        req.user = await User.findOne({_id}).select('_id')
        next()
    }catch(error){
        console.log(error)
        res.status(401).json({error: 'Request is not authorized'})
    }
}

module.exports = requireAuth