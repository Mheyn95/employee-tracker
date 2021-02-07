function viewDept(connection, callback) {
  // this is the similest query possible
  connection.query(
    `SELECT * 
     FROM department`,
    function (err, res) {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      return callback();
    }
  );
}

function viewRole(connection, callback) {
  // This query is pretty simple, we just use a join in order to pull the deparment name based on the department_id in the roles table
  connection.query(
    `SELECT roles.id, roles.title, department.name, roles.salary 
     FROM roles 
     LEFT JOIN department 
     ON roles.department_id = department.id;`,
    function (err, res) {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      return callback();
    }
  );
}

function viewEmployee(connection, callback) {
  // we had to use an alias for our employee table, 'B'. We did this to join the employee table on itself in order to view the manager name. The other joins are straight forward.
  connection.query(
    `SELECT A.id, A.first_name, A.last_name, roles.title, department.name, roles.salary, concat(B.first_name, ' ', B.last_name) AS manager_name 
  FROM employee A
  LEFT JOIN roles ON A.role_id = roles.id 
  LEFT JOIN department ON roles.department_id = department.id
  LEFT JOIN employee B ON A.manager_id = B.id;
`,
    function (err, res) {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      return callback();
    }
  );
}

module.exports = { viewDept, viewRole, viewEmployee };
