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
	async (req, res,next) => {
		try {
			res.send({ status: "success", message: "usuario  registrado" });
		} catch (error) {
			return next(error);
		}
	}
);

router.post(
	"/login",
	passport.authenticate("login", {
		session: false,
		failureRedirect: "/faillogin",
	}),
	async (req, res,next) => {
		try {
			await sessionControllers.loginController(req, res);
		} catch (error) {
			return next(error);
		}
	}
);

router.post("/logout", async (req, res,next) => {
	try {
		await sessionControllers.logoutController(req, res);
	} catch (error) {
		return next(error);
	}
});

router.put("/restartPassword", async (req, res,next) => {
	try {
		const result = await sessionControllers.restartPasswordController(req, res)
		res.send(result)
	} catch (error) {
		return next(error);
	}

});

router.get("/faillogin", async (req, res,next) => {
	try {
		console.log("Fallo la autenticación del login");
		res.send({ error: "Fallo la autenticación del login" });
	} catch (error) {
		return next(error);
	}
});

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res,next) => {
		try {
			sessionControllers.currentControlles(req, res)
		} catch (error) {
			return next(error);
		}
	}
);

router.get(
	"/github",
	passport.authenticate("github", { scope: "user:email" }),
)

router.get('/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login', session: false }),
	async (req, res,next) => {
		try {
			await sessionControllers.githubCallcackController(req, res);
		} catch (error) {
			return next(error);
		}
	}
)
export default router;

// las rutas no deben tener validaciones
