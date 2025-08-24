const pool = require('./pool')
const logwriter = require('./logwriter')
const bcrypt = require('bcrypt')
const jwt = require('./jwt_file')
/*
TODO:
-password,homeaddress,card detail etc... encryption https://kennethscoggins.medium.com/how-to-use-mysql-password-encryption-with-nodejs-express-and-bcrypt-ad9ede661109
-fix the queries, fix the const names
-test the routes
-test the queries
-write comments for the code
-modify the queries, so that it is actually useful for the shop
*/


const getUser = (req,res) => {
    pool.query(' SELECT * FROM "user" ', (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getUserInfo = (req,res) => { 
    const username = req.query.username;
    pool.query('SELECT * FROM "user" WHERE username = $1', [username], (error, results) => {
        if (error) {
                    logwriter.ErrorLogWriter(error)
                    throw error
                }
                
        res.status(200).json(results.rows);
    })
}

const checkUsernameAvailability = (req,res) => { 
    const username = req.query.username;
    pool.query('SELECT username FROM "user" WHERE username = $1', [username], (error, results) => {
        if (error) {
                    logwriter.ErrorLogWriter(error)
                    throw error
                }
                
        res.status(200).json(results.rows);
    })
}

const getLoggedinUserInfo = (req,res) => { 
    
    const useremail = req.query.user_email;
    pool.query('select * from "user" where user_email=$1', [useremail], (error, results) => {
        if (error) {
                    logwriter.ErrorLogWriter(error)
                    throw error
                }
                
        res.status(200).json(results.rows);
    })
}

const checkEmailAvailability = (req,res) => { 
    const email = req.query.email;
    pool.query('SELECT user_email FROM "user" WHERE user_email = $1', [email], (error, results) => {
        if (error) {
                    logwriter.ErrorLogWriter(error)
                    throw error
                }
                
        res.status(200).json(results.rows);
    })
}

const getUserPassword = (req,res) => { 
    const email = req.query.email;
    pool.query('SELECT password FROM "user" WHERE user_email = $1', [email], (error, results) => {
        if (error) {
                    logwriter.ErrorLogWriter(error)
                    throw error
                }
        if (results.rowCount == 0) {
            results.status = true;
            results.code = 404;
            results.message = "password not found";
            results.data = null;
        } 
                
        res.status(200).json(results.rows);
    })
}


const verifypassword = (req,res) => {
    const password = req.query.password;
    const email = req.query.email;
    pool.query('SELECT password FROM "user" WHERE user_email = $1', [email], (error, results) => {
        if (error) {
                logwriter.ErrorLogWriter(error)
                throw error
        }
        if (results.rowCount == 0) {
            results.status = true;
            results.code = 404;
            results.message = "password not found";
            results.data = null;
        } 
        bcrypt.compare(password,results.rows[0].password).then((match) => {
    if(!match) return res.json("Username and password is incorrect");
    res.json("Login Success");
    })
    })
}

const createUser = async (req,res) => {   //make it check if email or username already exists 
    const { user_email, username, address, post_number, card_pan, card_exp_date, card_security_code, password, firstname, lastname } = req.body;
    const hashedpassword = await bcrypt.hash(password, 10);
    pool.query('INSERT INTO "user" (user_email, username, address, post_number, card_pan, card_exp_date, card_security_code, password, firstname, lastname) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [user_email, username, address, post_number, card_pan, card_exp_date, card_security_code, hashedpassword, firstname, lastname], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        logwriter.ServerLogWriter('user created succesfully');
        res.status(201).send({"msg" : "user added"});
    })
}

const deleteUser = (req,res) => {
    const username = req.query.username
    pool.query('DELETE FROM "user" WHERE username = $1', [username], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        logwriter.ServerLogWriter(`user with name: ${username} deleted succesfully`);
        res.status(200).send("User deleted");
    })
}


module.exports = {
getUser,
getUserPassword,
createUser,
deleteUser,
checkUsernameAvailability,
checkEmailAvailability,
getUserInfo,
getLoggedinUserInfo,
verifypassword
};