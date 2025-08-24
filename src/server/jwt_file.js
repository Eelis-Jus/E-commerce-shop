//here we make function that return the jwt with all of the users infromation
//https://stackoverflow.com/questions/52781477/expected-payload-to-be-a-plain-object-mean

/*
TODO:
-test and make sure the jwt works
*/
require('dotenv').config()
const pool = require('./pool')
const jwt = require('jsonwebtoken')
const logwriter = require('./logwriter')
const { json } = require('express')

const jwtMaker = (req,res) => { 
    const user_email = req.query.user_email;
        const user={email: user_email};
        const accessToken = generateAccessToken(user);   
        res.json({ accessToken: accessToken});
}

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
}

module.exports={
    jwtMaker,
    generateAccessToken
}