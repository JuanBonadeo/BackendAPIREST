import passport from "passport";
import { userModel } from "../daos/mongodb/models/user.model.js";
import { createHash } from "../utils.js";
import GithubStrategy from "passport-github2";

import CartManager from "../daos/mongodb/managers/CartManager.class.js";
export const cartManager = new CartManager()

export const initializePassportGitHub= () => {
    passport.use('github', new GithubStrategy({
        clientID: "Iv1.981f963749d4db6e",
        clientSecret: "a0cb0e4a63c94e159d5dea31e9cef9277ad06de4",
        callbackURL: "http://localhost:8080/sessions/githubcallback"
    },
     async (accessToken, refreshToken, profile, done) => {
        let user = await userModel.findOne({ email: profile.profileUrl });
        if (!user) {
            const carrito = await cartManager.createCartId()
            let newUser = {
            name: profile.username,
            email: profile.profileUrl ,
            age: profile.age ? profile.age : 0,
            password: createHash("1234"),
            cart: carrito
            };
            const result = await userModel.create(newUser);
            console.log("Se crea un usuario nuevo, con los datos traidos desde Github")
            console.log(result)
            return done(null, result, {message: "Se crea un usuario nuevo, con los datos traidos desde Github"})
        } 
        else {
            console.log("El user ya existe en la DB - Lo loguea")
            return done(null, user, {message: "El user ya existe en la DB - logueado con éxito"});
        }
    }
))}
