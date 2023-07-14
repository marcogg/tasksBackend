const express = require('express')
const dotenv = require('dotenv').config()
const colors = require('colors')
const {errorHandler} = require ('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 5000

connectDB()

const app = express()

// En estas lineas usamos express para ver los datos del body del metodo post
app.use(express.json())
// app.use(express.urlencoded({ extended: false }))

app.use(errorHandler)

app.use('/api/tareas', require('./routes/tareasRoutes'))

app.use('/api/users', require('./routes/usersRoutes'))

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})