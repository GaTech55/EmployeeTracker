const DB = require("./db");
const mysql = require("mysql");
const { prompt } = require("inquirer");
const figlet = require("figlet");
const cTable = require("console.table");
const { endConnection } = require("./db");

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
  const { choice } = await prompt([
    {
      name: "choice",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Department",
        "View All Roles",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "End of Query",
      ],
    },
  ]);

  // .then(function (answer) {
  switch (choice) {
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
    case "Remove Employee":
      return employeeRemove();
      break;
    case "Update Employee Role":
      return employeeUpdateRole();
      break;
    case "Update Employee Manager":
      return employeeUpdateManager();
      break;
    case "End of Query":
      // endQuery();
      return endConnections();
      break;
  }
}

async function employeesAll() {
  const employees = await DB.findAllEmployees();
  console.table(employees);
  startQuery();
}

async function employeesDept() {
  const employees = await DB.findAllDepartments();
  console.table(employees);
  startQuery();
}

async function employeesRoles() {
  const employees = await DB.findAllRoles();
  console.table(employees);
  startQuery();
}

async function endConnections() {
  const employees = await DB.endConnection();
}
