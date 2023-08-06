require('dotenv').config()
require('express-async-errors')
const cookieParser = require('cookie-parser')

const express = require('express')
const app = express()

const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')

const authMiddleware = require('./middleware/authMiddleware')
const notFoundMiddleware = require('./middleware/not-Found')
const errorHandlerMiddleware = require('./middleware/error-handler')
const authRoute= require('./routes/userRoutes')
const productRoute = require('./routes/productsRoutes')
const departmentRoute = require('./routes/departmentRoutes')
const categoryRoute = require('./routes/categoryRoutes')
const searchRoute = require('./routes/searchRoutes')
const transactionRoutes = require('./routes/transactionRoutes')

const dbConnect = require('./config/db')

app.set('trust proxy', 1)
app.use(
    rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 100
    })
  )
app.use(helmet())
app.use(cors())
app.use(xss())
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/products', productRoute)
app.use('/api/v1/department', departmentRoute)
app.use('/api/v1/category', categoryRoute)
app.use('/api/v1/transaction', transactionRoutes)
app.use('/api/v1/search', authMiddleware, searchRoute)


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