const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

require("dotenv").config();
const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "22#charger",
  database: "employeetracker_db",
});

function selectQuestion() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "what would you like to do today",
        name: "queryOptions",
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add New Departments",
          "Add New Role",
          "Add New Employee",
          "Update Employee Role",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      switch (answer.queryOptions) {
        case "View All Departments":
          manageDepartment();
          break;
        case "View All Roles":
          manageRoles();
          break;
        case "View All Employees":
          viewEmployees();
          break;

        case "View All Departments":
          manageEmployees();
          break;
        case "Add New Departments":
          targetDepartment();
          break;
        case "Add New Role":
          newRole();
          break;
        case "Add New Employee":
          newEmployee();
          break;
        case "Update Employee Role":
          updateExistingRole();
          break;
        case "Exit":
          exit();
          break;
      }
    });
}

function manageDepartment() {
  db.query("SELECT * FROM department order by id", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectQuestion();
  });
}

function manageRoles() {
  db.query("SELECT * FROM role", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectQuestion();
  });
}

function manageEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectQuestion();
  });
}

function viewEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log("\n");
    console.table(result);
    selectQuestion();
  });
}

function targetDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department you would like to add?",
        name: "addDepartment",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO department (name) VALUES (?)`,
        `${answer.addDepartment}`,
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log(`\n`);
          console.table(result);
          selectQuestion();
        }
      );
    });
}

function newRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the title of the role you would like to add?",
        name: "addNewTitle",
      },
      {
        type: "input",
        message: "What is the salary of the role you would like to add?",
        name: "addNewSalary",
      },
      {
        type: "input",
        message: "What is the department of the role you would like to add?",
        name: "addNewDepartment",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`,
        [answer.addNewTitle, answer.addNewSalary, answer.addNewDepartment],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("\n");
          console.table(result);
          selectQuestion();
        }
      );
    });
}

function newEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you would like to add?",
        name: "addNewEmployeeFirstName",
      },
      {
        type: "input",
        message: "What is the employee last name ?",
        name: "addNewEmployeeLastName",
      },
      {
        type: "input",
        message: "What is the employee role id?",
        name: "addNewEmployeeRoleId",
      },
      {
        type: "input",
        message: "What is the manager for this employee?",
        name: "newEmployeeManager",
      },
    ])
    .then((answer) => {
      db.query(
        `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`,
        [
          answer.addNewEmployeeFirstName,
          answer.addNewEmployeeLastName,
          answer.addNewEmployeeRoleId,
          answer.newEmployeeManager,
        ],
        (err, result) => {
          if (err) {
            console.log(err);
          }
          console.log("\n");
          console.table(result);
          selectQuestion();
        }
      );
    });
}

function updateExistingRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employee_id",
        message: "which employee id  would you like to update the role for",
      },
      {
        type: "input",
        message: "What is the role id you would like to choose ?",
        name: "role_id",
      },
    ])
    .then((answer) => {
      db.query(
        "update employee set role_id = ? where id = ?",
        [answer.role_id, answer.employee_id],
        function (err, data) {
          selectQuestion();
        }
      );
    });
}

function exit() {
  return;
}

selectQuestion();