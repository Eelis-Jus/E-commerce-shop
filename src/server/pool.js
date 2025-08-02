require('dotenv').config()
const Pool = require("pg").Pool;
//remember to change the databse to the appropriate ones
//https://medium.com/@mateogalic112/how-to-build-a-node-js-api-with-postgresql-and-typescript-best-practices-and-tips-84fee3d1c46c
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  idleTimeoutMillis: 30000,
});

module.exports = pool; 
