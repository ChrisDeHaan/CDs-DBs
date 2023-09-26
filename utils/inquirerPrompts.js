const promptOptions = {
    mainOptions: [
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'mainOptions',
            choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add an Employee', 'Update an Employee Role']
        }
    ],
}

module.exports = promptOptions