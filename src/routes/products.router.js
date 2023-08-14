import { Router } from "express";
import __dirname from "../utils.js";
import ProductController from "../controllers/product.controller.js";
import passport from "passport";
import { rolesAdminMiddlewares } from "./middlewares/roles.Middleware.js";

let productControllers = new ProductController();

const router = Router();

router.get("/", async (req, res) => {
	let products = await productControllers.getProductsController(req);
	res.send({ products });
});

router.get("/:id", async (req, res) => {
	const product = await productControllers.getProductByIdController(req);
	res.send({ product });
});

router.post(
	"/",
	passport.authenticate("jwt", { session: false }),
	rolesAdminMiddlewares,
	async (req, res) => {
		const product = await productControllers.addProductController(req);
		res.send({ status: "success", product });
	}
);

router.put(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	rolesAdminMiddlewares,
	async (req, res) => {
		const product = await productControllers.updateProductController(
			req
		);
		res.send({ status: "success", product });
	}
);

router.delete(
	"/:pid",
	passport.authenticate("jwt", { session: false }),
	rolesAdminMiddlewares,
	async (req, res) => {
		const product = await productControllers.deleteProductController(
			req
		);
		res.send({ status: "success", product });
	}
);

export default router;
