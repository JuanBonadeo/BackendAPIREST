import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import winston from 'winston';

export const createHash =(password) => bcrypt.hashSync(password,bcrypt.genSaltSync(10));
export const validatePassword = (password,user) =>bcrypt.compareSync(password,user.password);
const logger = winston.createLogger({
      transports: [
            new winston.transports.Console({ level: "http"})
      ]
})
export const addLogger = (req,res,next) => {
      req.logger = logger;
      req.logger.http(`${req.methos} en ${req.url} - ${new Date().toLocaleTimeString}`)
      next()
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;