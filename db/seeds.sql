INSERT INTO departments (department_name) 
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, salary, department_id) 
VALUES  ('Sales Lead', 65000, 1),
        ('Salesperson', 25000, 1),
        ('Lead Engineer', 70000, 2),
        ('Software Engineer', 60000, 2),
        ('Account Manager', 80000, 3),
        ('Accountant', 60000, 3),
        ('Legal Team Lead', 150000, 4),
        ('Lawyer', 100000, 4);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES  ('Catherine', 'Halsey', NULL, 1),
        ('Avery', 'Johnson', 1, 2),
        ('Miranda', 'Keyes', NULL, 3),
        ('John', 'One-one-seven', 3, 4),
        ('A.I.', 'Cortana', NULL, 5),
        ('Jacob', 'Keyes', 5, 6),
        ('Chips', 'Dubbo', NULL, 7),
        ('Edward', 'Buck', 7, 8);