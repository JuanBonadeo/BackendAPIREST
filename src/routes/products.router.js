import { Router } from "express";
import __dirname from "../utils.js";
import ProductController from "../controllers/product.controller.js";
import passport from "passport";
import { rolesAdminMiddlewares } from "./middlewares/roles.Middleware.js";
import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";

let productControllers = new ProductController();
let pm = new ProductManager();

const router = Router();

router.get("/", async (req, res, next) => {
	try {
		let products = await productControllers.getProductsController(req);
		res.send({ products });
	} catch (error) {
		return next(error);
	}
});

router.get("/:id", async (req, res, next) => {
	const product = await productControllers.getProductsByIdController(req);
	res.send({ product });
});

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	rolesAdminMiddlewares,
	async (req, res, next) => {
		try {
			const product = await productControllers.addProductController(req);
			res.send({ status: "success", product });
		} catch (error) {
			return next(error);
		}
	}
);

router.put(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	rolesAdminMiddlewares,
	async (req, res, next) => {
		try {
			const product = await productControllers.updateProductController(req, res);
			res.send({ status: "success", product });
		} catch (error) {
			return next(error);
		}
	}
);

router.delete(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	rolesAdminMiddlewares,
	async (req, res, next) => {
		try {
			const product = await productControllers.deleteProductController(req);
			res.send({ status: "success", product });
		} catch (error) {
			return next(error);
		}
	} 
);

router.post("/mockingproducts", async (req, res) => {
	const result = await pm.generate100Products();
	res.send({ payload: result}) 
});

export default router;
