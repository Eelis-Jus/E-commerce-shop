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
    pool.query('SELECT * FROM "user" WHERE user_email = $1', [user_email], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }

        const userid = results.rows[0].userid    
        const userEmail=results.rows[0].user_email;
        const userName=results.rows[0].username;
        const FirstName=results.rows[0].firstname;
        const LastName=results.rows[0].lastname;    

        const user={userid: userid, email: userEmail, username: userName, firstname: FirstName, lastname: LastName};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)        
        res.cookie('token', accessToken, { httpOnly: true });
        res.json({ accessToken });
    })
}

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,(err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports={
    jwtMaker,
    authenticateToken
}