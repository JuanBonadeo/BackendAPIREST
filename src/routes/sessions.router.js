import { Router } from "express";
import { userModel } from "../daos/mongodb/models/user.model.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import SessionController from "../controllers/session.controller.js";

let sessionControllers = new SessionController();

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
	passport.authenticate("login", {
		session: false,
		failureRedirect: "/faillogin",
	}),
	async (req, res) => {
		await sessionControllers.loginController(req, res);
	}
);

router.post("/logout", async (req, res) => {
	await sessionControllers.logoutController(req, res);
});

router.put("/restartPassword", async (req, res) => {
	const result = await sessionControllers.restartPasswordController(req,res)
	res.send(result)
});

router.get("/faillogin", async (req, res) => {
	console.log("Fallo la autenticación del login");
	res.send({ error: "Fallo la autenticación del login" });
});

router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    sessionControllers.currentControlles(req,res)
  }
);

router.get(
  "/github",
  passport.authenticate("github", { scope: "user:email" }),
)

router.get('/githubcallback',
  passport.authenticate('github', {failureRedirect: '/login', session:false}),
  async (req, res) => {
    await sessionControllers.githubCallcackController(req, res);
  } 
)
export default router;

// las rutas no deben tener validaciones
