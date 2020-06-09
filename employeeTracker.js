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

connection.connect(function (err) {
    if (err) throw err;
    startApp();
});

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
        .then(function (option) {
            if (option.choice === "Add Employee") {
                addEmployee();
            } else if (option.choice === "Remove Employee") {
                removeEmployee();
            } else if (option.choice === "View All Employees") {
                viewEmployees();
            } else if (option.choice === "Add Role") {
                addRole();
            } else if (option.choice === "Remove Role") {
                removeRole();
            } else if (option.choice === "Update Employee Role") {
                updateRole();
            } else if (option.choice === "Add Department") {
                addDep();
            } else if (option.choice === "Remove Department") {
                removeDep();
            } else if (option.choice === "EXIT") {
                connection.end();
            }
        })
}

//Get array of roles

//Add employee to database
addEmployee() {

};
//Remove employee from database
removeEmployee() {
    
};
//View database
viewEmployees() {
    
};
//Add role
addRole() {
    
};
//Remove role
removeRole() {
    
};
//Update employee roles
updateRole() {
    
};
//Add department
addDep() {

};
//Remove department
removeDep() {

};
