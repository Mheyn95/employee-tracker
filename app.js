const sql = require("mysql2");
const inquirer = require("inquirer");

// create the connection to database
const connection = sql.createConnection({
  host: "localhost",
  user: "root",
  database: "employee_db",
});
