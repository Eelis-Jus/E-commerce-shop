const pool = require('./pool.js')
const logwriter=require('./logwriter');

//test the routes
//test the queries
//write comments for the code
//modifie the queries, so that it is actually useful for the shop
//https://dev.to/ahmadtheswe/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2

const getOrders = (req, res) => {
    pool.query('SELECT * FROM "orders" ', (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getOrderById = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('SELECT * FROM "orders" WHERE orderid = $1', [id], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        if (results.rowCount == 0) {
            res.status = true;
            res.code = 404;
            res.message = "order not found";
            res.data = null;
            logwriter.ServerLogWriter('order not found');
        } 
        res.status(200).json(results.rows);
    })
}

const createOrder = (req, res) => {
    const { userid, order_price, firstname, lastname, postnumber, homeaddress, email, items } = req.body;
    pool.query('INSERT INTO "orders" ( userid, order_price, firstname, lastname, postnumber, homeaddress, email, items) VALUES ($1, $2, $3,$4,$5,$6,$7,$8)', [ userid, order_price, firstname, lastname, postnumber, homeaddress, email,items], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        logwriter.ServerLogWriter('order added succesfully');
        res.status(201).send("order added");
    })
}

const deleteOrder = (req, res) => {
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM "orders" WHERE orderid = $1', [id], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        logwriter.ServerLogWriter(`order with id:${id} deleted succesfully`);
        res.status(201).send("order deleted");
    })
}


module.exports = {
    getOrders,
    getOrderById,
    createOrder,
    deleteOrder
}