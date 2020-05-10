require('dotenv').config()
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRET_KEY

const generateToken = (user) =>{
    const { id,first_name,last_name,email } = user

    return jwt.sign({ id,first_name,last_name,email}, secretKey);
}

module.exports = { generateToken }