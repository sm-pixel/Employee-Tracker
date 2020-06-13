USE employee_DB;

INSERT INTO department (dept_name)
VALUES ("Sales"), ("IT"), ("Fiance"), ("Human Resources"), ("Warehouse");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Director", 120000, 1),
("Sales Manager", 800000, 1)
("Salesperson", 40000, 1),
("Senior Developer", 120000, 2),
("Junior Developer", 400000, 2),
("Accountant", 100000, 3),
("HR Director", 90000, 4),
("HR Administrator", 30000, 4),
("Warehouse Manager", 90000, 5),
("S&R Associate", 40000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Michael", "McCormick", 1, null),
("Taylor", "Anderson", 2, 1),
("Nicholas", "Smith", 3, 1),
("Christina", "Williams", 4, null),
("Ryan", "Johnson", 5, 2),
("Naomi", "Miller", 6, null),
("Christopher", "Brown", 7, null),
("Brittany","Davis", 8, 4),
("Daryl", "Jones", 9, null),
("Jason", "Wilson", 10, 5);