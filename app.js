const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const { viewDept, viewRole, viewEmployee } = require("./lib/functions");
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
  initApp();
});

const question = {
  type: "list",
  name: "choice",
  message: "What would you like to do?",
  choices: [
    "View All Departments",
    "View All Roles",
    "View All Employees",
    "Add a Department",
    "Add a Role",
    "Add an Employee",
    "Update an Employee Role",
    // "Exit",
  ],
};

function initApp() {
  inquirer.prompt(question).then((answer) => {
    switch (answer.choice) {
      case "View All Departments":
        viewDept(connection);
        break;
      case "View All Roles":
        viewRole(connection);
        break;
      case "View All Employees":
        viewEmployee(connection);
        break;
      case "Add a Department":
        console.log("test");
        break;
      case "Add a Role":
        console.log("test");
        break;
      case "Add an Employee":
        console.log("test");
        break;
      case "Update an Employee Role":
        console.log("test");
      case "Exit":
        process.exit();
    }
    initApp();
  });
}
