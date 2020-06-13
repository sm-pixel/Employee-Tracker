//Required
const mysql = require("mysql");
const inquirer = require("inquirer");
//const cTable = require('console.table');

//Create mySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_db"
});

connection.connect(function (err) {
    if (err) throw err;
    startApp();
})

//Starts app
function startApp() {
    //Prompt user with questions
    inquirer.prompt({
        name: "options",
        type: "rawlist",
        message: "What would you like to do?",
        choices: ["Add Employee",
            "Remove Employee",
            "View All Employees",
            "Add Role",
            "Update Employee Role",
            "Add Department",
            "EXIT"]
    })
        //Call fuction based on answer
        .then(function (response) {
            if (response.options === "Add Employee") {
                addEmployee();
            } else if (response.options === "Remove Employee") {
                removeEmployee();
            } else if (response.options === "View All Employees") {
                viewEmployees();
            } else if (response.options === "Add Role") {
                addRole();            
            } else if (response.options === "Update Employee Role") {
                updateRole();
            } else if (response.options === "Add Department") {
                addDep();
            } else if (response.options === "EXIT") {
                connection.end();
            }
        }
        )
}

//Add employee to database
function addEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "lastName",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role",
            type: "input",
            message: "What is the employee's title?"
        }
    ])
        .then(function (response) {
            //Add to database
            connection.query("INSERT INTO employee SET ?", {
                //role_id: ,
                first_name: response.firstName,
                last_name: response.lastName,
                role: response.role
            }, function (err) {
                if (err) throw err;
            })
            startApp();
        })
};

//Remove employee from database

// //View database
// viewEmployees() {

// };

//Add role
function addRole() {
    connection.query("SELECT * FROM department", function (err, result) {
        if (err) throw err;
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the employee's title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the employee's salary?"
            },
            {
                name: "department",
                type: "input",
                message: "What department is the employee in?"
            }
        ])
            .then(function (response) {
                connection.query("INSERT INTO role SET ?", {
                    title: response.title,
                    salary: response.salary,
                    department: response.department
                }, function (err) {
                    if (err) throw err;
                })
                startApp();
            })
    })
};

// //Remove role
// removeRole() {

// };
// //Update employee roles
// updateRole() {

// };

//Add department
function addDep() {
    inquirer.prompt([
        {
            name: "depName",
            type: "input",
            message: "What is the department name?"
        }
    ])
        .then(function (response) {
            connection.query("INSERT INTO department SET ?", {
                department: response.depName
            }, function (err) {
                if (err) throw err;
            })
            startApp();
        })
}