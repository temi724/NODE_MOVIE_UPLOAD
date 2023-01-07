// const config = require('config')
const express = require('express')
const helmet = require('helmet')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
require('./startup/routes')(app)




app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: true }));


let conn_string = process.env.database_con
const to_conn_string = String(conn_string)

// console.log(conn_string)
require('./startup/connection')(to_conn_string, { useNewUrlParser: true, useUnifiedTopology: true })

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Hallos... this app is listenining on ${port}`))