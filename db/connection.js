const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Keisha5510",
  database: "employee_tracker_db",
});

connection.connect();
// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("connected as id " + connection.threadId);
//   startQuery();
// });

connection.query = util.promisify(connection.query);

module.exports = connection;
