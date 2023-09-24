const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3000
const app = express()

const db = mysql.createConnection('mysql2://root:password@localhost:3306/Company_Database')

function initPrompt () {
    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'mainPrompt',
            choices: ['View All Departments', 'View All Roles', 'View all Employees', 'Add a Department', 'Add an Employee', 'Update an Employee Role']
        }
    ])
    .then((answer) => {
        console.log(`----- You selected: "${answer.mainPrompt}". -----`)
        initPrompt()
    })
}

initPrompt()

app.listen(PORT, () => console.log(`Now listening on Port: ${PORT}`))