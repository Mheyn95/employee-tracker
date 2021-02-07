function viewDept(connection) {
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    console.log(`\n`);
    console.table(res);
    return;
  });
}

function viewRole(connection) {
  connection.query("SELECT * FROM roles", function (err, res) {
    if (err) throw err;
    console.log(`\n`);
    console.table(res);
    return;
  });
}

function viewEmployee(connection) {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(`\n`);
    console.table(res);
    return;
  });
}

module.exports = { viewDept, viewRole, viewEmployee };
