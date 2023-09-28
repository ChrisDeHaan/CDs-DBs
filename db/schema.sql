DROP DATABASE IF EXISTS company_database;
CREATE DATABASE company_database;

USE company_database;

 CREATE TABLE departments (
    id INT AUTO_INCREMENT,
    department_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
 );

CREATE TABLE roles (
    id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
);

CREATE TABLE employees (
    id INT AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id)
    REFERENCES employees(id),
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);