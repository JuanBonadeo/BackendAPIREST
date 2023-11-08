import passport from 'passport'
import { userModel } from '../daos/mongodb/models/user.model.js'
import { createHash } from '../utils.js'
import GithubStrategy from 'passport-github2'

import CartManager from '../daos/mongodb/managers/CartManager.class.js'
import config from './config.js'
import CustomError from '../services/errors/Error/CustomError.class.js'
export const cartManager = new CartManager()

export const initializePassportGitHub = (req,res,next) => {
  passport.use('github', new GithubStrategy({
    clientID: config.githubClientId,
    clientSecret: config.githubClientSecret,
    callbackURL: 'https://apirest.up.railway.app'//https://apirest.up.railway.app/sessions/githubcallback' 
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userModel.findOne({ email: profile.profileUrl })
    if (!user) {
      const carrito = await cartManager.createCartId()
      const newUser = {
        name: profile.username,
        email: profile.profileUrl,
        age: profile.age ? profile.age : 0,
        password: createHash('1234'),
        cart: carrito
      }
      const result = await userModel.create(newUser)
      req.logger.info(`new user register By GitHub: ${result.email}`)
      return done(null, result)
    } else {
      req.logger.info(`The user has already been registered in the DB - logged in successfully`)
      return done(null, user)
    }
    } catch (error) {
      
    }
    
  }
  ))
}
