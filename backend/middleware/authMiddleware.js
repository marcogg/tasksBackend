const jwt = require ('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const user = require('../models/usersModel')

const protect = asyncHandler(async(req, res, next) => {
    let token

    // Evaluate if we have a 'bearer' type of token we want it 
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            // Getting the token, splitting  the bearer and choosing the second group of spllitted array
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            // Getting data from the user located within the token
            req.user = await user.findById(decoded.id).select('-password')

            next()

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Unauthorized access')
        }
    }

    if(!token){
        res.status(401)
            throw new Error('Token not found')
    }

})

module.exports = {protect}