//Required
const mysql = require("mysql");
const inquirer = require("inquirer");
// const cTable = require("console.table");

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
            "View All Departments",
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
            } else if (response.options === "View All Departments") {
                viewDepartments();
            } else if (response.options === "EXIT") {
                connection.end();
            }
        })
}

//Add employee
function addEmployee() {
    let roleList = [];
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++)
            roleList.push(res[i].title)
    })
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
            type: "rawlist",
            message: "What is the employee's title?",
            choices: roleList
        }
    ])
        .then(function (response) {
            let newID;
            for (let a = 0; a < response.length; a++) {
                if (res[a].title == response.role) {
                    newID = res[a].id;
                }
            }
            //Add to database
            connection.query("INSERT INTO employee SET ?", {
                first_name: response.firstName,
                last_name: response.lastName,
                role_id: newID
            }, function (err) {
                if (err) throw err;
                console.log("You have added a new employee")
                console.table(response)
                startApp();
            })


        })
};

//Remove employee
function removeEmployee() {
    connection.query("SELECT * FROM employee", function (err, res) {
        // if (err) throw err;
        let employeeArr = [];
        for (let i = 0; i < res.length; i++) {
            employeeArr.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`);
        }
        inquirer.prompt([
            {
                name: "remEmp",
                type: "list",
                message: "Which employee would you like to remove?",
                choices: employeeArr
            }
        ])
            .then(function (response) {
                let remEmpId = parseInt(response.remEmp.split(" ")[0]);
                connection.query("DELETE FROM employee WHERE id=?", remEmpId,
                    function (err) {
                        if (err) throw err;
                        console.log(`You have removed ${response.remEmp}`)
                        startApp();

                    })
            })
    })
}

//View all employees
function viewEmployees() {
    // connection.query("SELECT * FROM employee LEFT JOIN role LEFT JOIN department",
    connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee LEFT JOIN role ON employee.role_id=role.id LEFT JOIN department ON role.department_id = department.id",

        function (err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        }
    )
};

//Add role
function addRole() {
    let departmentRole = [];
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            departmentRole.push(`${res[i].id}) ${res[i].dept_name}`);
        }
        inquirer.prompt([
            {
                name: "roleTitle",
                type: "input",
                message: "What is the new roles title?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the new roles salary?"
            },
            {
                name: "department",
                type: "list",
                message: "What department is this role in?",
                choices: departmentRole
            }
        ])
            .then(function (response) {
                let newID = parseInt(response.department.split(")")[0])

                connection.query("INSERT INTO role SET ?", {
                    title: response.roleTitle,
                    salary: response.salary,
                    department_id: newID
                }, function (err) {
                    if (err) throw err;
                    console.log("You have added a new role")
                    // console.table(response);
                    startApp();
                })

            })
    })
};
//Get roles in order to update
let roleList = [];
function getRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw err;
        for (let i = 0; i < res.length; i++) {
            roleList.push(`${res[i].id} ${res[i].title}`);
        }
    })
}
//Update employee role
function updateRole() {
    //Get roles
    getRoles()
    let employeeArr = [];
    connection.query("SELECT * FROM employee", function (err, res) {
        for (let i = 0; i < res.length; i++) {
            employeeArr.push(`${res[i].id} ${res[i].first_name} ${res[i].last_name}`);
        }
        inquirer.prompt([
            {
                name: "employee",
                type: "rawlist",
                message: "Which employee would you like to update their role?",
                choices: employeeArr
            },
            {
                name: "newRole",
                type: "rawlist",
                message: "What is their new role?",
                choices: roleList
            }
        ])
            .then(function (response) {
                console.log(`You would like to update ${response.employee}`);
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [
                    {
                        id: response.employee.split(" ")[0]
                    }
                ], function (err) {
                    if (err) throw err;
                    console.log(`You have updated ${response.employee}.`)
                    startApp();
                })
            })
    });

}

//Add department
function addDep() {
    inquirer.prompt([
        {
            name: "deptName",
            type: "input",
            message: "What is the department name?"
        }
    ])
        .then(function (response) {
            connection.query("INSERT INTO department SET ?", {
                dept_name: response.deptName
            }, function (err) {
                if (err) throw err;
                console.log("You have added a new department")
                // console.table(response)
                startApp();
            })

        })
}

//View all departments
function viewDepartments() {
    connection.query("SELECT * FROM department",
        function (err, res) {
            if (err) throw err;
            console.table(res);
            startApp();
        }
    )
};