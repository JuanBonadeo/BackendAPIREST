import jwt from 'jsonwebtoken'
import { createHash } from '../utils.js'
// import SessionService from '../services/session.service.js'
import { CurrentUserDTO } from '../DTO/user.dto.js'
import CustomError from '../services/errors/Error/CustomError.class.js'
import { ErrorEnum } from '../services/errors/enum/enums.js'
import { userModel } from '../daos/mongodb/models/user.model.js'
import Mail from '../helpers/mail.js'
import { compareSync } from 'bcrypt'
import config from '../config/config.js'
import SessionService from '../services/session.service.js'


export default class SessionController {
  constructor () {
    // this.sessionService = new SessionService()
    this.mail = new Mail()
    this.sessionService = new SessionService()
  }

  async loginController (req, res, next) {
    try {
      const usuario = {
        nombre: `${req.user.first_name} - ${req.user.last_name}`,
        email: req.user.email,
        edad: req.user.age,
        rol: req.user.role,
        id: req.user._id,
        cart: req.user.cart
      }
      const token = jwt.sign({ email: req.body.email, usuario, role: req.user.role, cart: req.user.cart }, config.jwtSecret, { // poner var de entorno
        expiresIn: '24h'
      }) 
      this.sessionService.updateUserLastConnection(usuario.id)
      res
        .cookie('coderCookie', token, { httpOnly: true })
        .send({ status: 'succes', user: req.user })
      req.logger.info(`new user login: ${usuario.email}`)
     
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async logoutController (req, res, next) {
    try {
      req.logger.info('Cookie eliminada')
      res.clearCookie('coderCookie').send('Cookie Eliminada')
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async resetPasswordController (req, res, next) {
    try {
      const { password, email } = req.body
      if (!password || !email) {
        CustomError.createError({
          name: 'password cant be restarted',
          cause: 'some password are empty',
          message: 'error trying to restart password',
          code: ErrorEnum.BODY_ERROR
        })
      }
      const user = await userModel.findOne({ email })
      if (compareSync(password, user.password)) {
        CustomError.createError({
          name: 'password cant be restarted',
          cause: 'You cant use your last password',
          message: 'error trying to restart password',
          code: ErrorEnum.BODY_ERROR
        })
      }
      if (!user) {
        CustomError.createError({
          name: 'user not found in db',
          cause: 'user not found in db',
          message: `this user: ${user} is not found`,
          code: ErrorEnum.DATABASE_ERROR
        })
      }

      const newHashedPassword = createHash(password)
      await userModel.updateOne(
        { _id: user._id },
        { $set: { password: newHashedPassword } }
      )

      req.logger.info(`User ${user.email} modified the password`)
      res.send({ status: 'success', message: 'Contraseña restaurada' })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async githubCallcackController (req, res, next) {
    try {
      const usuario = {
        nombre: `${req.user.first_name} - ${req.user.last_name}`,
        email: req.user.email,
        edad: req.user.age,
        rol: req.user.role,
        id: req.user._id
      }

      const token = jwt.sign({ email: req.body.email, usuario, role: 'user' }, config.jwtSecret, {
        expiresIn: '24h'
      })
      req.logger.debug('Entro a githubCallback')
      return res.cookie('coderCookie', token, { httpOnly: true }).redirect('https://apirest.up.railway.app/views/products')
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async currentControlles (req, res) {
    let user = new CurrentUserDTO(req.user)
    res.send(user)
  }

  async requestResetPasswordController (req, res, next) {
    try {
      const { email } = req.body
      if (!email) {
        CustomError.createError({
          name: 'password restart cant be requested',
          cause: 'email is empty',
          message: 'error trying to request a new password',
          code: ErrorEnum.BODY_ERROR
        })
      }
      const user = await userModel.findOne({ email })
      if (!user) {
        CustomError.createError({
          name: 'user not found in db',
          cause: 'user not found in db',
          message: `this user: ${user} is not found`,
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      const tokenReset = jwt.sign({ email }, config.jwtResetSecret, {
        expiresIn: '1h'
      })

      let html = `<h1>Correo de Recuperación de Contraseña - ${email}</h1>`
      html = html.concat(
        `<div><h1>Restaura tu contraseña haciendo click en el siguiente link</h1> 
        https://apirest.up.railway.app/views/resetPassword?token=${tokenReset}</div>`)
      const result = this.mail.send(email, 'Correo de Recuperación de Contraseña', html)
      req.logger.info(`Sending recovery password email to ${email}`)
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async toPremiumController (req, res, next) {
    try {
      const id = req.params.id
      const role = req.user.role
      if (role === 'admin') {
        CustomError.createError({
          name: 'you dont have acces',
          cause: 'admin cant be premium',
          message: 'you must be a suer or premium role',
          code: ErrorEnum.ROLE_ERROR
        })
      }
      let newRole
      if (role === 'user') {
        // const verified = await this.sessionService.verifyPremiumRequiredDoc(id)
        // console.log(verified)
        // if(!verified){
        //   CustomError.createError({
        //     name: 'you dont have acces',
        //     cause: 'you must upload the required documents',
        //     message: 'you must upload the required documents',
        //     code: ErrorEnum.ROLE_ERROR
        //   })
        // }
        newRole = 'premium'
      } else if (role === 'premium') {
        newRole = 'user'
      }
      // Realiza la actualización del rol
      await userModel.updateOne(
        { _id: id },
        { $set: { role: newRole } }
      )
      req.logger.info(`user ${req.user.email} has chagned role to ${newRole}`)
      res.json({ status: 'success', message: `Role updated to ${newRole}` })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async addDocumentController (req, res, next) {
    try {
     
      let id = req.params.uid;
      let archivos=req.files; 
  
      let identification;
      let adress;
      let accountStatus;
  
      if(archivos.identification){
       identification="/src/public/images/documents/identification/"+archivos.identification[0].filename;
      }
      if(archivos.adress){
       adress="/src/public/images/documents/adress/"+archivos.adress[0].filename;
      }
      if(archivos.accountStatus){
       accountStatus="/src/public/images/documents/accountStatus/"+archivos.accountStatus[0].filename;
      }
  
      const documentsPaths=[identification, adress, accountStatus]
      const documentsNames=["identification","adress","accountStatus"]
    
      let result = await this.sessionService.updatePathDocuments(id,documentsNames,documentsPaths);
  
      if(result){
        return res.send({status: "success", message: "Archivos actualizados con Exito!"});
      } 
      else{
        return res.status(400).
        send({status: "failure", details: "Error - No se pudo actualizar el path de archivos."})
      }
  
    }
    catch (error) {
      return res.status(404).send({status: "error", error: error.message});
    }
  }
  async deleteInactiveUsersController (req, res, next) {
    try {
      const result = await this.sessionService.deleteInactiveUsersService(req, res, next)
      res.send(result)
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }
  async getAllUsersController (req, res, next) {
    try {
      const result = await this.sessionService.getAllUsersService(req, res, next)
      res.send(result)
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }
}
