const db = require('../server')

const mySQL = {
    displayEmployees () {
        return new Promise((res, rej) => {
            db.promise().query(`
            SELECT 
            CONCAT(employees.first_name, ' ', employees.last_name) AS Employee,
            roles.title AS Title,
            roles.department_id AS Department,
            roles.salary AS Salary,
            CONCAT(managers.first_name, ' ', managers.last_name) AS manager
            FROM employees INNER JOIN roles
            ON employees.role_id = roles.id
            LEFT JOIN employees AS managers
            ON employees.manager_id = managers.id;
            `).then( ([rows, fields]) => {
                console.clear()
                console.table(rows)
                res()
            })
        })

    }
}

module.exports = mySQL