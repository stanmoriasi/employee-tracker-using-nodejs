DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

\c employees_db;

CREATE TABLE department (
id SERIAL PRIMARY KEY,
name VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE role (
id SERIAL PRIMARY KEY,
title SERIAL NOT NULL,
salary INTEGER NOT NULL,
department SERIAL NOT NULL,
FOREIGN KEY (department) REFERENCES department (id)
);


CREATE TABLE employee (
id SERIAL PRIMARY KEY,
first_name VARCHAR(100) NOT NULL,
last_name VARCHAR(100) NOT NULL,
role_id INTEGER,
manager_id INTEGER,
FOREIGN KEY (role) REFERENCES role (id),
FOREIGN KEY (manager_id) REFERENCES employee (id)
);