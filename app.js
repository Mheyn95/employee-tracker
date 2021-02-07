const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const { viewDept, viewRole, viewEmployee } = require("./lib/views");
const { addDept, addRole, addEmployee } = require("./lib/adds");
const updateEmployee = require("./lib/update");

require("dotenv").config({ path: __dirname + "/.env" });

let runAgain = true;
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
    "Exit",
  ],
};

const initApp = function () {
  inquirer.prompt(question).then((answer) => {
    switch (answer.choice) {
      case "View All Departments":
        return viewDept(connection, initApp);
      case "View All Roles":
        return viewRole(connection, initApp);
      case "View All Employees":
        return viewEmployee(connection, initApp);
      case "Add a Department":
        return addDept(connection, initApp);
      case "Add a Role":
        return addRole(connection, initApp);
      case "Add an Employee":
        return addEmployee(connection, initApp);
      case "Update an Employee Role":
        return updateEmployee(connection, initApp);
      case "Exit":
        process.exit();
    }
  });
};
