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
            if (answer.mainOptions === 'View all Departments') { console.log(`----- You selected: "${answer.mainOptions}". -----`); initPrompt() }

            if (answer.mainOptions === 'View all Roles') { console.log(`----- You selected: "${answer.mainOptions}". -----`); initPrompt() }

            if (answer.mainOptions === 'View all Employees') {
                db.query(`
                SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS Employee,
                roles.title AS Title,
                roles.department_id AS Department,
                roles.salary AS Salary,
                CONCAT(managers.first_name, ' ', managers.last_name) AS manager
                FROM employees INNER JOIN roles
                ON employees.role_id = roles.id
                LEFT JOIN employees AS managers
                ON employees.manager_id = managers.id;
                `, (err, res) => {
                    console.clear()
                    console.table(res)
                    initPrompt()
                })
            }

            if (answer.mainOptions === 'Add a Department') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions().addDepartment).then((answer) => { console.log(answer.newDept); initPrompt() })
            }

            if (answer.mainOptions === 'Add a Role') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions().addRole).then( (answer) => { console.log(answer.newRoleName, answer.newRoleSalary, answer.newRoleDept); initPrompt() })
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