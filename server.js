const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')

const PORT = process.env.PORT || 3000
const app = express()

app.listen(PORT, () => console.log(`Now listening on Port: ${PORT}`))