import passport from "passport";
import local from "passport-local";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { createHash, validatePassword } from "../utils.js";

import CartManager from "../daos/mongodb/CartManager.class.js";
export const cartManager = new CartManager()

const LocalStrategy = local.Strategy;

export const initializePassportLocal = () => {
  passport.use(
    "register",
    new LocalStrategy(
      { passReqToCallback: true, usernameField: "email" },
      async (req, username, password, done) => {
        const { first_name, last_name, age, email } = req.body;
        try {
          
          const user = await userModel.findOne({ email: username })
          if (user) {
            console.log("user already exists");
            return done(null, false);
          }
          const carrito = await cartManager.createCartId()
          const newUser = {
            first_name,
            last_name,
            age,
            email,
            password: createHash(password),
            cart: carrito
          };
          const result = await userModel.create(newUser);
          return done(null, result);
        } catch (error) {
          return done("error al registrar usuario" +error);
        }
      }
    )
  );

  passport.use(
    "login",
    new LocalStrategy(
      { usernameField: "email" },
      async (username, password, done) => {
        try {
          const user = await userModel.findOne({ email: username });
          if (!user) {
            console.log("user does not exist");
            return done(null, false);
          }
          console.log(user)
          if (!validatePassword(password, user)) {
            return done("invalid password", null);
          }
          return done(null, user);
        } catch (e) {}
      }
    )
  );
};
