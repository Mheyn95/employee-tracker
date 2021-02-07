function viewDept(connection) {
  connection.query(
    `SELECT * 
     FROM department`,
    function (err, res) {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      return;
    }
  );
}

function viewRole(connection) {
  connection.query(
    `SELECT roles.id, roles.title, department.name, roles.salary 
     FROM roles 
     LEFT JOIN department 
     ON roles.department_id = department.id;`,
    function (err, res) {
      if (err) throw err;
      console.log(`\n`);
      console.table(res);
      return;
    }
  );
}

function viewEmployee(connection) {
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
      return;
    }
  );
}

module.exports = { viewDept, viewRole, viewEmployee };
