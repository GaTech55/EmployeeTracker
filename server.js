//look at Activity 14 - Two Tables.  Will need to create 14 to 16 functions.  Need 3 different databases

const mysql = require("mysql");
const inquirer = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Keisha5510",
  database: "employee_tracker_db",
});

figlet("Employee Manager", function (err, data) {
  if (err) {
    console.log("Something went wrong with figlet");
    console.dir(err);
    return;
  }
  console.log(data);
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  startQuery();
});

function startQuery() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Employees By Department",
        "View All Employees By Manager",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "End of Query",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "View All Employees":
          employeesAll();
          break;
        case "View All Employees By Department":
          employeesDept();
          break;
        case "View All Employees By Manager":
          employeesManager();
          break;
        case "Add Employee":
          employeeAdd();
          break;
        case "Remove Employee":
          employeeRemove();
          break;
        case "Update Employee Role":
          employeeUpdateRole();
          break;
        case "Update Employee Manager":
          employeeUpdateManager();
          break;
        case "End of Query":
          // endQuery();
          connection.end();
          break;
      }
    });
}

function employeesAll() {
  let query =
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary,d.name department, CONCAT(mgr.first_name,' ', mgr.last_name) manager FROM employee e LEFT OUTER JOIN role r ON r.id = e.role_id LEFT OUTER JOIN department d ON d.id = r.department_id LEFT OUTER JOIN employee mgr ON mgr.id = e.manager_id;";
  connection.query(query, function (err, res) {
    console.table(res);
    startQuery();
  });
}

//Need to request from user which department that they want to see then display it.  Need to change prompt to input then dynamically search for the name.  Reason for this is when new departments are created the input needs to match the values given.
function employeesDept() {
  let query =
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary,d.name department, CONCAT(mgr.first_name,' ', mgr.last_name) manager FROM employee e LEFT OUTER JOIN role r ON r.id = e.role_id LEFT OUTER JOIN department d ON d.id = r.department_id LEFT OUTER JOIN employee mgr ON mgr.id = e.manager_id;";
  connection.query(query, function (err, res) {
    console.table(res);
    startQuery();
  });
}

function employeesManager() {
  let query =
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary,d.name department, CONCAT(mgr.first_name,' ', mgr.last_name) manager FROM employee e LEFT OUTER JOIN role r ON r.id = e.role_id LEFT OUTER JOIN department d ON d.id = r.department_id LEFT OUTER JOIN employee mgr ON mgr.id = e.manager_id;";
  connection.query(query, function (err, res) {
    console.table(res);
    startQuery();
  });
}
