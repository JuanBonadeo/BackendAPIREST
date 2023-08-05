import jwt  from "jsonwebtoken";
import { createHash } from "../utils.js";

const register=async (req,res) =>{
    try{
      res.send({ status: "success", message: "usuario  registrado" });
    }catch(error){
      res.status(404).send({status: "error", details: "Hubo un error al resgitrar usuario-"})
  }
}
const login=async (req,res) =>{
    try{
      const usuario={
        nombre: `${req.user.first_name} - ${req.user.last_name}`,
        email: req.user.email,
        edad: req.user.age,
        rol: req.user.role,
        id: req.user._id,
        cart: req.user.cart
        }
      let token = jwt.sign({ email: req.body.email, usuario, role:'user', cart: req.user.cart }, "coderSecret", {
        expiresIn: "24h",
      });
      res
        .cookie("coderCookie", token, { httpOnly: true })
        .send({ status: "succes", user:req.user });
    }catch(error){
      res.status(404).send({status: "error", details: "Hubo un error al iniciar sesion-"})
  }
}


const logout=async (req,res) =>{
    try{
      console.log("Cookie eliminada");
      res.clearCookie('coderCookie').send('Cookie Eliminada');
    }catch(error){
      res.status(404).send({status: "error", details: "Hubo un error al salir de sesion-"})
  }
}
const restartPassword=async (req,res) =>{
    try{
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .send({ status: "error", error: "Incomplete Values" });
      const user = await userModel.findOne({ email });
      if (!user)
        return res.status(404).send({ status: "error", error: "Not user found" });
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
const github=async (req,res) =>{ }

const githubcallback=async (req,res) =>{
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


export default {
    register,
    login,
    logout,
    restartPassword,
    github,
    githubcallback
}

