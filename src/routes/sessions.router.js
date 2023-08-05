import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import passport from "passport";
import jwt from 'jsonwebtoken'
import sessionControllers from "../controllers/session.controllers.js";

const router = Router();

router.post("/register",
  passport.authenticate("register", { session: false }),
  sessionControllers.register
);

router.post(
  "/login",
  passport.authenticate("login", { session: false, failureRedirect:'/faillogin' }),
  sessionControllers.login
);

router.get("/faillogin",async (req, res) => {
  console.log("Fallo la autenticación del login");
  res.send({error:"Fallo la autenticación del login"});
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

router.post('/logout', sessionControllers.logout)

router.post("/restartPassword", sessionControllers.restartPassword);

router.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
  sessionControllers.github
);

router.get('/githubcallback',
passport.authenticate('github', {failureRedirect: '/login', session:false}),
sessionControllers.githubcallback
)
export default router;


// las rutas no deben tener validaciones