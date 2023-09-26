const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3000
const app = express()

const db = mysql.createConnection('mysql2://root:password@localhost:3306/Company_Database')
module.exports = db

const promptOptions = require('./utils/inquirerPrompts')
const mySQL = require('./utils/displayFunctions')

function initPrompt() {
    inquirer.prompt(promptOptions.mainOptions)
        .then((answer) => {
            if (answer.mainOptions === 'View all Departments') { console.log(`----- You selected: "${answer.mainOptions}". -----`); initPrompt() }

            if (answer.mainOptions === 'View all Roles') { console.log(`----- You selected: "${answer.mainOptions}". -----`); initPrompt() }

            if (answer.mainOptions === 'View all Employees') { mySQL.displayEmployees().then(() => initPrompt()) }

            if (answer.mainOptions === 'Add a Department') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions.addDepartment).then((answer) => { console.log(answer.newDept); initPrompt() })
            }

            if (answer.mainOptions === 'Add a Role') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions.addRole).then( (answer) => { console.log(answer.newRoleName, answer.newRoleSalary, answer.newRoleDept); initPrompt() })
            }

            if (answer.mainOptions === 'Add an Employee') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions.addEmployee).then((answer) => { console.log(answer.newEmpFirstName, answer.newEmpLastName, answer.newEmpRole, answer.newEmpMan); initPrompt() })
            }

            if (answer.mainOptions === 'Update an Employee Role') {
                console.log(`----- You selected: "${answer.mainOptions}". -----`)
                inquirer.prompt(promptOptions.updateEmployee).then((answer) => { console.log(answer.updateEmp); initPrompt() })
            }
        })
}

app.listen(PORT, async () => {
    await console.log(`Application is now running on Port: ${PORT}`)
    initPrompt()
})