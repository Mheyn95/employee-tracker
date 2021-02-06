const mysql = require("mysql2");
const inquirer = require("inquirer");
require("dotenv").config({ path: __dirname + "/.env" });

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.host,
  port: process.env.port,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});
