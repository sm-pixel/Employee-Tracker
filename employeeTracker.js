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
    database: "employee_DB"
});

connection.connect (function (err) {
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
            "Remove Role",
            "Update Employee Role",
            "Add Department",
            "Remove Department",
            "EXIT"]
    })
    //Call fuction based on answer
        .then(function (response) {
            if (response.choice === "Add Employee") {
                addEmployee();
            } else if (response.choice === "Remove Employee") {
                removeEmployee();
            } else if (response.choice === "View All Employees") {
                viewEmployees();
            } else if (response.choice === "Add Role") {
                addRole();
            } else if (response.choice === "Remove Role") {
                removeRole();
            } else if (response.choice === "Update Employee Role") {
                updateRole();
            } else if (response.choice === "Add Department") {
                addDep();
            } else if (response.choice === "Remove Department") {
                removeDep();
            }else if (response.choice === "EXIT") {
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
            message: "What is the employee's role?"
        }
    ])
    .then(function(response) {
        //Add to database
        connection.query("INSERT INTO employee SET?", {
            //role_id: ,
            first_name: response.firstName,
            last_name: response.lastName,
            role: response.role            
        }, function(err) {
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
        if(err) throw err;
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
        .then(function(response) {
            connection.query("INSERT INTO role SET?", {
                title: response.title,
                salary: response.salary,
                department: response.department
            }, function(err) {
                if(err) throw err;
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
// //Add department
// addDep() {

// };
// //Remove department
// removeDep() {

// };