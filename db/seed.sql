INSERT INTO department (name) 
VALUES 
('Engineering'),
('Sales'),
('Support'),
('Marketing'),
('HR'),
('Finance'),
('Administration');

INSERT INTO roles (title, salary, department_id) 
VALUES 
('CTO', 200000.00, 1),
('Senior Developer', 120000.00, 1),
('Junior Developer', 70000.00, 1),
('Chief of Sales', 200000.00, 2),
('Account Executive', 120000.00, 2),
('ADR', 70000.00, 2),
('COO', 200000.00, 3),
('CSM', 70000.00, 3),
('Support Team Lead', 50000.00, 3),
('Support Specialist', 25000.00, 3),
('Head of Marketing', 200000.00, 4),
('Marketing Intern', 25000.00, 4),
('Head of HR', 120000.00, 5),
('Hiring Manager', 70000.00, 5),
('CFO', 200000.00, 6),
('Billing Specialist', 50000.00, 6),
('CEO', 250000.00, 7),
('Executive Assistant', 50000.00, 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
('John', 'Doe', 1, NULL),
('Jane', 'Doe', 2, 1),
('James', 'Doe', 3, 1),
('John', 'Smith', 4, NULL),
('Jane', 'Smith', 5, 4),
('James', 'Smith', 6, 4),
('Elon', 'Musk', 17, NULL);