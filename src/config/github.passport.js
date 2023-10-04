import passport from 'passport'
import { userModel } from '../daos/mongodb/models/user.model.js'
import { createHash } from '../utils.js'
import GithubStrategy from 'passport-github2'

import CartManager from '../daos/mongodb/managers/CartManager.class.js'
import config from './config.js'
export const cartManager = new CartManager()

export const initializePassportGitHub = (req) => {
  passport.use('github', new GithubStrategy({
    clientID: config.githubClientId,
    clientSecret: config.githubClientSecret,
    callbackURL: 'https://apirest.up.railway.app/sessions/githubcallback'
  },
  async (accessToken, refreshToken, profile, done) => {
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
      console.log(`Se crea un usuario nuevo, con los datos traidos desde Github \n ${result}`)
      return done(null, result)
    } else {
      console.log('El user ya existe en la DB - logueado con éxito')
      return done(null, user)
    }
  }
  ))
}
