require("dotenv").config(); //process.env is created
const mysql = require("mysql2");

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_DATABASE,
  BACKEND_PORT
} = process.env;

const db = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASSWORD,
});

module.exports = {
  db,
  port: BACKEND_PORT
};
