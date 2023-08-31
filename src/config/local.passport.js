import passport from "passport";
import local from "passport-local";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { createHash, validatePassword } from "../utils.js"
import config from './config.js';
import CartManager from "../daos/mongodb/managers/CartManager.class.js";
export const cartManager = new CartManager()



const LocalStrategy = local.Strategy;

export const initializePassportLocal = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async ( req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        try {
          const user = await userModel.findOne({ email: username })
          if (user) {
            req.logger.debug(`User ${user.email} already exist`);
            return done(null, false);
          }
          const carrito = await cartManager.createCartId()
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: carrito,
            role: "user"
          };
          const result = await userModel.create(newUser);
          req.logger.info(`new user register: ${result.email}`)
          return done(null, result);
        } catch (error) {
          req.logger.error(error);
          return done("error al registrar usuario" +error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      {passReqToCallback: true,usernameField: "email" },
      async ( req, username, password, done) => {
        try {
          
          if(username== config.adminName && password== config.adminPassword){
            let user = {
            first_name: "Admin",
            last_name: "Coder",
            age: "25",
            
            email: `${config.adminName}`,
            //password: "adminCod3r123",
            password: `${config.adminPassword}`,
            rol: "admin"
            };
            return done(null, user,  {message: "Usted se ha logueado como Coder Admin!"});
          }
          // busco usuario
          const user = await userModel.findOne({ email: username });
          if (!user) {
            req.logger.error(`User ${user.email} not exist`)
            return done(null, false);
          }
          if (!validatePassword(password, user)) {
            req.logger.debug(`Incorrect password`)
            return done("", null);
          }
          req.logger.debug(`New login ${user.email}`)
          return done(null, user);
        } catch (error) {
          req.logger.error(error);
        }
      }
    )
  );
};
