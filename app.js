require('dotenv').config()
require('express-async-errors')
require('./social_login')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')
const session = require('express-session');
const mongoose = require('mongoose');
const passportSetup = require('./social_login')
const MongoStore = require('connect-mongo');
const express = require('express')
const passport = require('passport')
const app = express()

const helmet = require('helmet')
const cors = require('cors')
const rateLimiter = require('express-rate-limit')

//swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");   

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

    //Setting Up Session
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: { 
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
    },
    store: new MongoStore({
                 //mongooseConnection: mongoose.connection, 
                 mongoUrl: process.env.MONGO_URI,
                 touchAfter: 24 * 3600 // time period in seconds
                // autoRemove: 'interval',
                // autoRemoveInterval: 10 // In minutes. Default
                }),
 }))

// app.use(cookieSession({
//     maxAge: 24 * 60 * 60 * 1000,
//     keys: [process.env.SESSION_KEY]
// }))

app.use(passport.initialize());
app.use(passport.session())

app.use(helmet())
app.use(cors())
app.use(cookieParser())
app.use(express.json())
                 
              
app.get("/", (req, res) => {
  res.send(
    '<h1>Chat Application API</h1><a href="/api-docs">Documentation</a>'
  );
});
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

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
