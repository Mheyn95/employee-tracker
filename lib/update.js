//add inquirer
const inquirer = require("inquirer");

// set up variables for employee list
let employeeChoices = "";
let employees = [];

let role_id = 0;
let roleChoices = "";
let roles = [];

function updateEmployee(connection, callback) {
  // first we get a list of the current employee names and push them into an array
  connection.query(
    `SELECT id, concat(first_name, " ", last_name) AS employee_name
               FROM employee;`,
    function (err, res) {
      if (err) throw err;

      employeeChoices = res;
      for (let i = 0; i < employeeChoices.length; i++) {
        employees.push(employeeChoices[i].employee_name);
      }
      return;
    }
  );

  // now we get a list of the current role names and push them into an array
  connection.query(
    `SELECT roles.id, roles.title 
           FROM roles;`,
    function (err, res) {
      if (err) throw err;

      roleChoices = res;
      for (let i = 0; i < roleChoices.length; i++) {
        roles.push(roleChoices[i].title);
      }
      return;
    }
  );

  const questions = [
    {
      type: "input",
      name: "check",
      message: "PLease press 'enter'.",
    },
    {
      type: "list",
      name: "employee",
      message: "What employee would you like to update?",
      choices: employees,
    },
    {
      type: "list",
      name: "newRole",
      message: "What employee would you like to update?",
      choices: roles,
    },
  ];

  inquirer.prompt(questions).then((answers) => {
    // we get the employee id by looping through response until we find the name that matches the employee chosen and grab the ID associated with that and set the employee id to it
    for (let i = 0; i < employeeChoices.length; i++) {
      if (employeeChoices[i].employee_name === answers.employee) {
        employee_id = employeeChoices[i].id;
      }
    }

    // we get the role id by looping through response until we find the name that matches the role chosen and grab the ID associated with that and set the role id to it
    for (let i = 0; i < roleChoices.length; i++) {
      if (roleChoices[i].title === answers.newRole) {
        role_id = roleChoices[i].id;
      }
    }

    //run the insert statement
    connection.query(
      `UPDATE employee SET role_id = ?
      WHERE id = ?;`,
      [role_id, employee_id],

      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee updated!\n");
        return callback();
      }
    );
  });
}

module.exports = updateEmployee;
