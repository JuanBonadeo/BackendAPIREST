/* eslint-disable no-unused-vars */
import dotenv from 'dotenv'
import express from 'express'
import handlebars from 'express-handlebars'
import mongoose from 'mongoose'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import { initializePassportJWT } from './config/jwt.passport.js'
import { initializePassportLocal } from './config/local.passport.js'
import { initializePassportGitHub } from './config/github.passport.js'
import __dirname from './utils.js'
import { errorMiddleware } from './services/errors/middleware/error.middleware.js'
import { addLogger } from './config/logger.config.js'
import config from './config/config.js'
// routers
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import routerViews from './routes/views.router.js'
import routerMessages from './routes/messages.router.js'
import routerSessions from './routes/sessions.router.js'
// swageer config
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'
// initial configuration

const app = express()

const connection = mongoose.connect(
  config.mongoUrl
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

// handlebars configuration
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')
// swagger config
const swaggerOptions ={
  definition: {
    openapi: '3.0.1',
    info:{
      title: "documentacion de api rest",
      description:'Full apirest for a ecommerce'
    }
  },
  apis:[`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJSDoc(swaggerOptions)

// passport configuration

app.use(cookieParser())
initializePassportJWT()
initializePassportLocal()
initializePassportGitHub()
app.use(passport.initialize())

// routes


app.listen(config.port, () => console.log(`listening on port ${config.port} go to https://apirest.up.railway.app/views/login `))
app.use(addLogger)
app.use('/apidocs',swaggerUiExpress.serve, swaggerUiExpress.setup(specs))
app.use('/products/', routerProducts)
app.use('/carts/', routerCarts)
app.use('/messages/', routerMessages)
app.use('/sessions/', routerSessions)
app.use('/views', routerViews)
app.use(errorMiddleware)

 