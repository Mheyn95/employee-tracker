//add inquirer
const inquirer = require("inquirer");

// set up the variables for all functions
let dept_id = 7;
let depts = [];
let deptChoices = "";

let role_id = 0;
let roleChoices = "";
let roles = [];

let manager_id = 0;
let managerChoices = "";
// we set this to NA to give the user an option of not adding a manager since that is not required
let managers = ["N/A"];

function addDept(connection) {
  inquirer
    .prompt({
      type: "input",
      name: "dept",
      message: "What is the department name?",
      validate: (deptInput) => {
        if (deptInput) {
          return true;
        } else {
          console.log("Please enter the department!");
          return false;
        }
      },
    })
    .then((deptName) => {
      //using the answer we got in the prompt we can insert a record
      connection.query(
        `INSERT INTO department (name) VALUES (?)`,
        deptName.dept,
        function (err, res) {
          if (err) throw err;
          console.log(res.affectedRows + " department inserted!\n");
          return;
        }
      );
    });
}

function addRole(connection) {
  //first we get a list of the current department names and push them into an array
  connection.query(
    `SELECT * 
           FROM department`,
    function (err, res) {
      if (err) throw err;

      deptChoices = res;
      for (let i = 0; i < deptChoices.length; i++) {
        depts.push(deptChoices[i].name);
      }
      return;
    }
  );
  const questions = [
    {
      type: "input",
      name: "title",
      message: "What is the role title?",
      validate: (title) => {
        if (title) {
          return true;
        } else {
          console.log("Please enter the role title!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
      validate: (salaryInput) => {
        if (salaryInput) {
          return true;
        } else {
          console.log("Please enter the salary amount!");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "dept",
      message: "What is the department name?",
      choices: depts,
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    // we get the department ID by looping through response until we find the name that matches the department chosen and grab the ID associated with that and set the department id to it
    for (let i = 0; i < deptChoices.length; i++) {
      if (deptChoices[i].name === answers.dept) {
        dept_id = deptChoices[i].id;
      }
    }
    //run the insert statement
    connection.query(
      `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`,
      [answers.title, answers.salary, dept_id],

      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " role inserted!\n");
        return;
      }
    );
  });
}

function addEmployee(connection) {
  // first we get a list of the current role names and push them into an array, we also will get the names of current employees for potential managers
  connection.query(
    `SELECT roles.id, roles.title 
           FROM roles`,
    function (err, res) {
      if (err) throw err;

      roleChoices = res;
      for (let i = 0; i < roleChoices.length; i++) {
        roles.push(roleChoices[i].title);
      }
      return;
    }
  );

  connection.query(
    `SELECT id, concat(first_name, " ", last_name) AS manager_name
           FROM employee`,
    function (err, res) {
      if (err) throw err;

      managerChoices = res;
      for (let i = 0; i < managerChoices.length; i++) {
        managers.push(managerChoices[i].manager_name);
      }
      return;
    }
  );

  const questions = [
    {
      type: "input",
      name: "first",
      message: "What is the employee's first name?",
      validate: (first) => {
        if (first) {
          return true;
        } else {
          console.log("Please enter the first name!");
          return false;
        }
      },
    },
    {
      type: "input",
      name: "last",
      message: "What is the employee's last name?",
      validate: (last) => {
        if (last) {
          return true;
        } else {
          console.log("Please enter the last name!");
          return false;
        }
      },
    },
    {
      type: "list",
      name: "role",
      message: "What is the employee's role?",
      choices: roles,
    },
    {
      type: "list",
      name: "manager",
      message: "Who does this employee report to?",
      choices: managers,
    },
  ];
  inquirer.prompt(questions).then((answers) => {
    // we get the role id by looping through response until we find the name that matches the role chosen and grab the ID associated with that and set the role id to it
    for (let i = 0; i < roleChoices.length; i++) {
      if (roleChoices[i].title === answers.role) {
        role_id = roleChoices[i].id;
      }
    }
    // we get the manager id by looping through response until we find the name that matches the manager chosen and grab the ID associated with that and set the manager id to it
    for (let i = 0; i < managerChoices.length; i++) {
      if (managerChoices[i].manager_name === answers.manager) {
        manager_id = managerChoices[i].id;
      } else if (answers.manager === "N/A") {
        manager_id = null;
      }
    }
    //run the insert statement
    connection.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
      [answers.first, answers.last, role_id, manager_id],

      function (err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " employee inserted!\n");
        return;
      }
    );
  });
}

module.exports = { addDept, addRole, addEmployee };
