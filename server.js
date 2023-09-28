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
                ON roles.department_id = departments.id;
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
                ON roles.department_id = departments.id;
                `, (err, res) => {
                    console.table(res)
                    initPrompt()
                })
            }

            if (answer.mainOptions === 'Add a Department') {
                inquirer.prompt(promptOptions().addDepartment).then((answer) => {
                    db.query(`INSERT INTO departments(department_name) VALUES('${answer.newDept}')`, () => {
                        initPrompt()
                    })
                })
            }

            if (answer.mainOptions === 'Add a Role') {
                inquirer.prompt(promptOptions().addRole).then((answer) => {
                    db.query(`INSERT INTO roles(title, salary, department_id) VALUES('${answer.newRoleName}', '${answer.newRoleSalary}', '${answer.newRoleDept}')`, () => {
                        initPrompt()
                    })
                })
            }

            if (answer.mainOptions === 'Add an Employee') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions().addEmployee).then((answer) => { console.log(answer.newEmpFirstName, answer.newEmpLastName, answer.newEmpRole, answer.newEmpMan); initPrompt() })
            }

            if (answer.mainOptions === 'Update an Employee Role') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)

                db.query(`SELECT CONCAT(first_name, ' ', last_name) AS name, id AS value FROM employees`, (err, res) => {
                    inquirer.prompt(promptOptions(res).updateEmployee).then((answer) => { console.log(answer.updateEmp); initPrompt() })
                })
            }
        })
}

app.listen(PORT, async () => {
    await console.log(`Application is now running on Port: ${PORT}`)
    initPrompt()
})