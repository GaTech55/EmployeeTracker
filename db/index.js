const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.query(
      "SELECT e.id, e.first_name, e.last_name, r.title, r.salary,d.name department, CONCAT(mgr.first_name,' ', mgr.last_name) manager FROM employee e LEFT OUTER JOIN role r ON r.id = e.role_id LEFT OUTER JOIN department d ON d.id = r.department_id LEFT OUTER JOIN employee mgr ON mgr.id = e.manager_id;"
    );
  }

  findAllDepartments() {
    return this.connection.query("SELECT name department FROM department;");
  }

  findAllRoles() {
    return this.connection.query("SELECT title FROM role;");
  }

  // Find all employees except the given employee id
  findAllPossibleManagers(employeeId) {
    return this.connection.query(
      "SELECT id, first_name, last_name FROM employee WHERE id != ?",
      employeeId
    );
  }
  // Create a new employee
  createEmployee(employee) {
    return this.connection.query("INSERT INTO employee SET ?", employee);
  }
  // Remove an employee with the given id
  removeEmployee(employeeId) {
    return this.connection.query(
      "DELETE FROM employee WHERE id = ?",
      employeeId
    );
  }
  endConnection() {
    return this.connection.end();
  }
}

module.exports = new DB(connection);
