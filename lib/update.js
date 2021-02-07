function updateEmployee(connection) {
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

module.exports = updateEmployee;
