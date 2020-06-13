USE employee_DB;

INSERT INTO department (dept_name)
VALUES ("Sales"), ("IT"), ("Fiance"), ("Human Resources"), ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Director", 120000, 1),
("Sales Manager", 800000, 1),
("Salesperson", 40000, 1),
("Senior Developer", 120000, 2),
("Junior Developer", 400000, 2),
("Accountant", 100000, 3),
("HR Director", 90000, 4),
("HR Administrator", 30000, 4),
("Warehouse Manager", 90000, 5),
("S&R Associate", 40000, 5);

INSERT INTO employee (first_name, last_name, manager_id)
VALUES ("Michael", "McCormick", null),
("Taylor", "Anderson", 1),
("Nicholas", "Smith", 1),
("Christina", "Williams", null),
("Ryan", "Johnson", 2),
("Naomi", "Miller", null),
("Christopher", "Brown", null),
("Brittany","Davis", 4),
("Daryl", "Jones", null),
("Jason", "Wilson", 5);