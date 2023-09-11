import { Router } from "express";
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
		req.logger.info(`new user register: ${req.body.email}`)
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

router.post("/resetPassword", 
	async (req, res, next) => {
		const result = await sessionControllers.resetPasswordController(req, res,next)
		res.send(result)
});

router.get("/faillogin", async (req, res,next) => {
	req.logger.warning("fallo la autenticacion del login")
});

router.get(
	"/current",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		sessionControllers.currentControlles(req, res)
	}
);

router.get(
	"/github",
	passport.authenticate("github", { scope: "user:email" }),
)

router.get('/githubcallback',
	passport.authenticate('github', { failureRedirect: '/login', session: false }),
	async (req, res) => {
		await sessionControllers.githubCallcackController(req, res);
	}
)

router.post('/requestResetPassword',
    	async(req,res,next)=>{
    	await sessionControllers.requestResetPasswordController(req,res,next);
    
});
router.post('/premium/:id',
	passport.authenticate("jwt", { session: false }),
    	async(req,res,next)=>{
    	await sessionControllers.toPremiumController(req,res,next);
    
});



    

export default router;


