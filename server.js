const mysql = require("mysql");
const util = require("util");
const inquirer = require("inquirer");
const figlet = require("figlet");
const { exit } = require("process");
const { start } = require("repl");

const connection = mysql.createConnection({
  host: "localhost",
  port: process.env.PORT || 3306,
  user: "root",
  password: "Keisha5510",
  database: "employee_tracker_db",
});

// updating connection information to server.js file
connection.connect(function (err) {
  if (err) throw err;
});

figlet("Employee Manager", function (err, data) {
  if (err) {
    console.log("Something went wrong with figlet");
    console.dir(err);
    return;
  }
  console.log(data);
  startQuery();
});

async function startQuery() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Department",
        "View All Roles",
        "Add Employee",
        "Add Employee Role",
        "Update Employee Manager",
        "End of Query",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      switch (answer.choice) {
        case "View All Employees":
          return employeesAll();
          break;
        case "View All Department":
          return employeesDept();
          break;
        case "View All Roles":
          return employeesRoles();
          break;
        case "Add Employee":
          return employeeAdd();
          break;
        case "Add Employee Role":
          return employeeAddRole();
          break;
        case "Update Employee Manager":
          return employeeUpdateManager();
          break;
        case "End of Query":
          exit();
      }
    });
}

async function employeesAll() {
  let query =
    "SELECT e.id, e.first_name, e.last_name, r.title, r.salary,d.name department, CONCAT(mgr.first_name,' ', mgr.last_name) manager FROM employee e LEFT OUTER JOIN role r ON r.id = e.role_id LEFT OUTER JOIN department d ON d.id = r.department_id LEFT OUTER JOIN employee mgr ON mgr.id = e.manager_id;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuery();
  });
}

async function employeesDept() {
  let query = "SELECT name department FROM department;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuery();
  });
}

async function employeesRoles() {
  let query = "SELECT title FROM role;";
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    startQuery();
  });
}

async function employeeAdd() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "first_name",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "last_name",
      },
      {
        type: "input",
        message: "What is the employee's id number",
        name: "role_id",
      },
      {
        type: "input",
        message: "What is the employee's manager id",
        name: "manager_id",
      },
    ])
    .then((response) => {
      console.log(response);

      connection.query(`INSERT INTO employee SET ?`, response, (err, res) => {
        if (err) throw err;
        console.log("New employee successfully added!");
        startQuery();
      });
    });
}

async function employeeAddRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role's title?",
        name: "title",
      },
      {
        type: "input",
        message: "What is the role's salary?",
        name: "salary",
      },
      {
        type: "input",
        message: "What is the role's department id?",
        name: "department_id",
      },
    ])
    .then((response) => {
      console.log(response);

      connection.query(`INSERT INTO role SET ?`, response, (err) => {
        if (err) throw err;
        console.log("Successfully added the role!");
        startQuery();
      });
    });
}
