const pool = require('./pool.js'); 
const logwriter=require('./logwriter');

//fix the queries, fix the const names
//test the routes
//test the queries
//write comments for the code
//modifie the queries, so that it is actually useful for the shop
//https://dev.to/ahmadtheswe/crud-rest-api-with-nodejs-expressjs-and-postgresql-57b2

const getItem = (req, res) => {
    pool.query('SELECT * FROM "item" ORDER BY itemid ASC', (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        res.status(200).json(results.rows);
    })
}

const getItemsforcategory = (req, res) => { 
    const category = req.query.category;
    pool.query('SELECT * FROM "item" where category = $1 ORDER BY itemid ASC', [category], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        res.status(200).json(results.rows);
    })
}
/*
const getItemById = (req,res) => {
    const id = parseInt(req.params.id);
    pool.query('SELECT * FROM "item" WHERE itemid = $1', [id], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        } 
        res.status(201).json(results.rows);
    })
};
*/
const getItemByName = (req, res) => {
    const item_name = req.query.item_name;
    pool.query('SELECT * FROM "item" where item_name = $1', [item_name], (error, results) => {
         if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
             }
                res.status(200).json(results.rows);
    })
};

const removeItemFromStock = (req, res) => {
    const id = parseInt(req.params.id)
    const amount = parseInt(req.params.amount)
    pool.query('update item set amount_in_stock=amount_in_stock-$1 where itemid=$2', [amount,id], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        if (results.rowCount == 0) {
            res.status = true;
            res.code = 404;
            res.message = "amount not removed from the stock";
            res.data = null;
            logwriter.ServerLogWriter('amount not removed from the stock');
        } 
        logwriter.ServerLogWriter(`${amount} removed from the stock`);
        res.status(200).json(`${amount} removed from the stock`);
    })
}

const createItem = (req, res) => {
    const { item_name, amount_in_stock, price, description, category } = req.body;
    pool.query('INSERT INTO item (item_name, amount_in_stock, price, description, category) VALUES ($1, $2, $3, $4, $5)', [item_name, amount_in_stock, price, description, category], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(`${error}`)
            throw error
        }
        logwriter.ServerLogWriter('item added succesfully');
        res.status(201).json("item added");
    })
}

const deleteItem = (req, res) => {
    const  itemname  = req.query.itemname;
    pool.query('DELETE FROM item WHERE item_name = $1', [itemname], (error, results) => {
        if (error) {
            logwriter.ErrorLogWriter(error)
            throw error
        }
        logwriter.ServerLogWriter(`item with name: ${itemname} deleted succesfully`);
        res.status(204).json("Item deleted");
    })
}


module.exports = {
    getItem,
  //  getItemById,
    getItemByName,
    getItemsforcategory,
    createItem,
    deleteItem,
    removeItemFromStock
}