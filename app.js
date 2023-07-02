require('dotenv').config()
require('express-async-errors')
const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

const notFoundMiddleware = require('./middleware/not-Found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authRoute= require('./routes/userRoutes')
const productRoute = require('./routes/productsRoutes')

const dbConnect = require('./config/db')

app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productRoute)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT||3000

const start = async() => {
    try {
        await dbConnect(process.env.MONGO_URI)
        app.listen(port, () => {
            
            console.log(`Server is listening on port ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()