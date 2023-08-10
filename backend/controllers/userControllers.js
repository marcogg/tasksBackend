const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/usersModel')

const registerUser = asyncHandler(async (req, res) => {
    
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        res.status(400)
        throw new Error ('Faltan datos')
    }
    
    // Verify if the user already exits
    // Find One method only brings the first result of the search, find method brings all of them
    const userExists = await User.findOne({email})

    if (userExists) {
    res.status(400)
    throw new error('There is already a user with this email, please enter another email');
    }

    // HASHING THE PASSWORD
    // On next line, we will add a random number 10 times before creating the hash, to prevent two different users using exactly the same password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
        name,
        email,
        password, hashedPassword
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            _name: user.name,
            _email: user.email
        })
    } else {
        res.status(400)
        throw new Error ('User couldnt be created')
    }

    res.json({message: 'user create'})
})




// LOGIN USER
const loginUser = asyncHandler(async (req, res) => {
    // Verify if user already exists
    const user = await User.findOne({email})
        // Compare is a Bcrypt dependency method, dee docs for more info
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                    _id: user.id,
                    _name: user.name,
                    _email: user.email,
                    token: generateToken(user._id)
            })
        } else {
            res.status(400)
            throw new Error ('Credenciales incorrectas')
        }
        
    
    // res.json({message: 'User login'})
})

// GET USER
const getUserData = asyncHandler(async (req, res) => {
    
    
    
    res.json({message: 'User Data:'})
})

// GENERATE TOKEN

const generateToken = (id) => {
    // Here we save in the payload what we want to include in JWT, considering our secret element in .env file
    return jwt.sign({id}, process.env.JWT_SECRET)
    // Nex line expiration time of Token (30 days in this case)
    expiresIn: '30d'
}
module.exports = {registerUser, loginUser, getUserData}