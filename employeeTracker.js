//Required
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

//Create mySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "employee_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    startApp();
});

//Starts app
function startApp() {
    inquirer.prompt({
        name: "",
        type: "list",
        message: "What would you like to do?",
        choices: ["Add Employee", 
        "Remove Employee", 
        "View All Employees", 
        "Update Employee Role",
        "Add Role",
        "Remove Role",
        "EXIT"]
    })
}
    //Prompt user with questions

    //Call fuction based on answer

//Get array of roles

//Add employee to database

//Remove employee from database

//View database

//Update employee information

//Add role entry

//View roles

//Update employee roles