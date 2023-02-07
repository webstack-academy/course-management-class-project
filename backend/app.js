const express = require('express')
require('dotenv').config()
const path = require('path')
const hbs = require('hbs')
const { createTables } = require("./services/db");
const cors = require ('cors')

const app = express()
const port = 3000

app.use(cors({
  origin: '*',
  methods: ['POST']
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'localhost:3001')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, enctype')

  next()
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

    createTables()
      .then(() => console.log("Tables created"))
      .catch((err) => console.log('tables creation error: ', err))
})