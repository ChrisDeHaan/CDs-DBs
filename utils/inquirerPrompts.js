const promptOptions = (list1, list2) => {
    return {
        mainOptions: [
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'mainOptions',
                choices: ['View all Departments', 'View all Roles', 'View all Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update an Employee Role', 'End Program']
            }
        ],
        addDepartment: [
            {
                type: 'input',
                message: 'What is the name of the new Department?',
                name: 'newDept'
            }
        ],
        addRole: [
            {
                type: 'input',
                message: 'What is the name of the new Role?',
                name: 'newRoleName'
            },
            {
                type: 'number',
                message: 'What is the salary for the new Role?',
                name: 'newRoleSalary',
            },
            {
                type: 'list',
                message: 'What department is the new Role a part of?',
                name: 'newRoleDept',
                choices: list1
            }
        ],
        addEmployee: [
            {
                type: 'input',
                message: 'What is the first name of the employee?',
                name: 'newEmpFirstName'
            },
            {
                type: 'input',
                message: 'What is the last name of the employee?',
                name: 'newEmpLastName'
            },
            {
                type: 'list',
                message: 'What role does this employee have?',
                name: 'newEmpRole',
                choices: list1
            },
            {
                type: 'list',
                message: 'What manager oversees this employee?',
                name: 'newEmpMan',
                choices: list2
            }
        ],
        updateEmployeeRole: [
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'updateEmp',
                choices: list1
            },
            {
                type: 'list',
                message: 'What role should the employee have?',
                name: 'updateRole',
                choices: list2
            }
        ]
    }
}

module.exports = promptOptions