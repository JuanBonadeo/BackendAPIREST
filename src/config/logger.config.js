import winston from 'winston'
import config from './config.js'

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5
  },
  colors: {
    fatal: 'red',
    error: 'orange',
    warning: 'yellow',
    info: 'blue',
    http: 'blue',
    debug: 'white'
  }
}

// En Prod - agregamos transporte de consola y de archivo
const loggerProd = winston.createLogger({
  levels: customLevelOptions.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple() // You can adjust the format as needed
  ),
  transports: [
    new winston.transports.Console({ level: 'http' }),
    new winston.transports.File({ level: 'error', filename: '../errors.log' })
  ]
})

// En Dev - agregamos transporte de consola
const loggerDev = winston.createLogger({
  levels: customLevelOptions.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple() // You can adjust the format as needed
  ),
  transports: [
    new winston.transports.Console({ level: 'debug' })
  ]
})

// Ahora, a partir de un Middleware, vamos a colocar en el objeto req del logger
export const addLogger = (req, res, next) => {
  req.logger = config.environment === 'PRODUCTION' ? loggerProd : loggerDev
  req.logger.http(`Acceso al endpoint ${req.method} en ${req.url}`)
  next()
}
