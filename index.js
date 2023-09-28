const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3000
const app = express()

const db = mysql.createConnection('mysql2://root:password@localhost:3306/Company_Database')

const promptOptions = require('./utils/inquirerPrompts')

function initPrompt() {
    inquirer.prompt(promptOptions().mainOptions)
        .then((answer) => {
            if (answer.mainOptions === 'View all Departments') {
                db.query(`SELECT id, department_name Departments FROM departments`, (err, res) => {
                    console.table(res)
                    initPrompt()
                })
            }

            if (answer.mainOptions === 'View all Roles') {
                db.query(`
                SELECT roles.id,
                roles.title Title,
                roles.salary Salary,
                departments.department_name Department
                FROM roles RIGHT JOIN departments
                ON roles.department_id = departments.id
                WHERE roles.id > 0;
                `, (err, res) => {
                    console.table(res)
                    initPrompt()
                })
            }

            if (answer.mainOptions === 'View all Employees') {
                db.query(`
                SELECT employees.id,
                CONCAT(employees.first_name, ' ', employees.last_name) Employee,
                roles.title Title,
                departments.department_name Department,
                roles.salary Salary,
                CONCAT(managers.first_name, ' ', managers.last_name) Manager
                FROM employees INNER JOIN roles
                ON employees.role_id = roles.id
                LEFT JOIN employees managers
                ON employees.manager_id = managers.id
                RIGHT JOIN departments
                ON roles.department_id = departments.id
                WHERE employees.id > 0;
                `, (err, res) => {
                    console.table(res)
                    initPrompt()
                })
            }

            if (answer.mainOptions === 'Add a Department') {
                inquirer.prompt(promptOptions().addDepartment).then( answer => {
                    db.query(`INSERT INTO departments(department_name) 
                    VALUES('${answer.newDept}')
                    `, () => {
                        initPrompt()
                    })
                })
            }

            if (answer.mainOptions === 'Add a Role') {
                db.query(`SELECT department_name AS name, id AS value FROM departments`, (err, res) => {
                    inquirer.prompt(promptOptions(res).addRole).then( answer => {
                        db.query(`INSERT INTO roles(title, salary, department_id) 
                        VALUES('${answer.newRoleName}', ${answer.newRoleSalary}, ${answer.newRoleDept})
                        `, () => {
                            initPrompt()
                        })
                    })
                })
            }

            if (answer.mainOptions === 'Add an Employee') {
                db.query(`SELECT title AS name, id AS value FROM roles`, (err1, res1) => {
                    db.query(`SELECT CONCAT(first_name, ' ' , last_name) AS name, id AS value FROM employees`, (err2, res2) => {
                        inquirer.prompt(promptOptions(res1, res2).addEmployee).then( answer => {
                            db.query(`
                            INSERT INTO employees(first_name, last_name, manager_id, role_id)
                            VALUES('${answer.newEmpFirstName}','${answer.newEmpLastName}', ${answer.newEmpMan}, ${answer.newEmpRole})
                            `, () => {
                                initPrompt()
                            })
                        })
                    })
                })
            }

            if (answer.mainOptions === 'Update an Employee Role') {
                db.query(`SELECT CONCAT(first_name, ' ' , last_name) AS name, id AS value FROM employees`, (err1, res1) => {
                    db.query(`SELECT title AS name, id AS value FROM roles`, (err2, res2) => {
                        inquirer.prompt(promptOptions(res1, res2).updateEmployeeRole).then( answer => {
                            db.query(`
                            UPDATE employees SET role_id = ${answer.updateRole} WHERE id = ${answer.updateEmp}
                            `, () => {
                                initPrompt()
                            })
                        })
                    })
                })
            }
        })
}

app.listen(PORT, async () => {
    await console.log(`Application is now running on Port: ${PORT}`)
    initPrompt()
})