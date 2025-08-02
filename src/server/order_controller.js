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
    const { itemid, userid, order_price, firstname, lastname, postnumber, homeaddress, email} = req.body;
    pool.query('INSERT INTO "orders" (itemid, userid, order_price) VALUES ($1, $2, $3)', [itemid, userid, order_price, firstname, lastname, postnumber, homeaddress, email], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        logwriter.ServerLogWriter('order added succesfully');
        res.status(201).send("Order added");
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