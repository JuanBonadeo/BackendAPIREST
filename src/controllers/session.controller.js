import jwt  from "jsonwebtoken";
import { createHash } from "../utils.js";
import SessionService from "../services/session.service.js";
import { CurrentUserDTO } from "../DTO/user.dto.js";
import CustomError from "../services/errors/Error/CustomError.class.js";
import { ErrorEnum } from "../services/errors/enum/enums.js";
import { generateErrorInfoProduct, generateErrorID } from "../services/errors/info.js";

export default class SessionController {
  constructor(){
    this.sessionService = new SessionService()
  }

  async loginController(req,res){
      const usuario={
        nombre: `${req.user.first_name} - ${req.user.last_name}`,
        email: req.user.email,
        edad: req.user.age,
        rol: req.user.role,
        id: req.user._id,
        cart: req.user.cart
        }
      let token = jwt.sign({ email: req.body.email, usuario, role: req.user.role, cart: req.user.cart }, "coderSecret", { // poner var de entorno
        expiresIn: "24h",
      });
      res
        .cookie("coderCookie", token, { httpOnly: true })
        .send({ status: "succes", user:req.user });
  }
  async logoutController(req,res){
    try{
      console.log("Cookie eliminada");
      res.clearCookie('coderCookie').send('Cookie Eliminada');
    }catch(error){
      res.status(404).send({status: "error", details: "Hubo un error al salir de sesion-"})
  }
  }
  async restartPasswordController(req,res){
    try{
      const { email, password } = req.body;
      if (!email || !password) {
        CustomError.createError({
          name: "password cant be restarted",
          cause: "email or password are empty",
          message: "error trying to restart password",
          code: ErrorEnum.BODY_ERROR,
        });
      }
      const user = await userModel.findOne({ email });
      if (!user){
        CustomError.createError({
        name: "user not found in db",
        cause: "user not found in db",
        message: `this user: ${user} is not found`,
        code: ErrorEnum.DATABASE_ERROR,
      });
      }
      
      const newHashedPassword = createHash(password);
      await userModel.updateOne(
        { _id: user._id },
        { $set: { password: newHashedPassword } }
      );
      res.send({ status: "success", message: "Contraseña restaurada" });
    }catch(error){
      res.status(404).send({status: "error", details: "Hubo un error al cambiar Contraseña-"})
  }
  }
  async githubCallcackController(req,res){
    try{
      const usuario={
        nombre: `${req.user.first_name} - ${req.user.last_name}`,
        email: req.user.email,
        edad: req.user.age,
        rol: req.user.role,
        id: req.user._id
        }
      
        let token = jwt.sign({ email: req.body.email, usuario, role:'user'}, "coderSecret", {
          expiresIn: "24h",
        });
      console.log('Entro a githubCallback')
      return res.cookie("coderCookie", token, { httpOnly: true }).redirect('/products')
    
    }catch(error){
      res.status(404).send({status: "error", details: "Hubo un error al iniciar sesion con github-"})
  }
  }
  async currentControlles(req,res){
    res.send(new CurrentUserDTO(req.user))
  }
} 






