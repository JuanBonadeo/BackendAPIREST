import { Router } from "express";
import __dirname from "../utils.js";
import ProductController from "../controllers/product.controller.js";
import passport from "passport";
import {  rolesAdminPremiumMiddlewares } from "./middlewares/roles.Middleware.js";
import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";

let productControllers = new ProductController();
let pm = new ProductManager();

const router = Router();

router.get("/", async (req, res) => {
		let products = await productControllers.getProductsController(req,res);
		res.send({ products });

});

router.get("/:id", async (req, res) => {
	const product = await productControllers.getProductsByIdController(req.res);
	res.send({ product });

	
});

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	rolesAdminPremiumMiddlewares,
	async (req, res) => {
			const product = await productControllers.addProductController(req,res);
			res.send({ status: "success", product });
	}
);

router.put(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	rolesAdminPremiumMiddlewares,
	async (req, res,next) => {
			const product = await productControllers.updateProductController(req, res,next);
			res.send({ status: "success" });
	}
);

router.delete(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	rolesAdminPremiumMiddlewares,
	async (req, res) => {
			const product = await productControllers.deleteProductController(req,res);
			res.send({ status: "success", product });
	} 
);

router.post("/mockingproducts", async (req, res) => {
	const result = await pm.generate100Products();
	res.send({ payload: result}) 
});

export default router;
