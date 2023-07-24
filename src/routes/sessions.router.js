import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import passport from "passport";
import jwt from 'jsonwebtoken'

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  async (req, res) => {
    res.send({ status: "success", message: "usuario  registrado" });
  }
);

router.post(
  "/login",
  passport.authenticate("login", { session: false }),
  async (req, res) => {
    let token = jwt.sign({ email: req.body.email }, "coderSecret", {
      expiresIn: "24h",
    });
    res
      .cookie("coderCookie", token, { httpOnly: true })
      .send({ status: "success" });
  }
);

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.post("/restartPassword", async (req, res) => {
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
});

router.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
  (req, res) => {}
);

router.get('/githubcallback',passport.authenticate('github', {failureRedirect: '/login', session:false}),async (req, res)=>{
  const usuario={
    nombre: `${req.user.first_name} - ${req.user.last_name}`,
    email: req.user.email,
    edad: req.user.age,
    rol: req.user.role,
    id: req.user._id
    }
  
  let token = jwt.sign({ email: req.user.email, usuario, role:'user'}, "coderSecret", {
      expiresIn: "24h",
  });
  console.log('Entro a githubCallback')
  return res.cookie("coderCookied", token, {httpOnly: true}).redirect('/products')
} )
export default router;