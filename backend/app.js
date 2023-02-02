const express = require('express')
const mysql = require('mysql')
const doenv = require('dotenv')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = 3000

doenv.config({
    path: './.env'
})

app.use(express.urlencoded({ extended: false}))

const location = path.join(__dirname, './public')
app.use(express.static(location))
app.set('view engine', 'hbs')

const partialsPath = path.join(__dirname, './views/partials')
hbs.registerPartials(partialsPath)

app.use('/', require('./routes/pages'))
app.use('/auth', require('./routes/auth'))

app.listen(port, () => {
    console.log(`Server Started on port: ${port}!`)
})