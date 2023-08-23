import { Router } from "express";
import __dirname from "../utils.js";
import passport from "passport";

import CartController from "../controllers/cart.controller.js";
import { verificarPerteneciaCarrito } from "./middlewares/carts.Middleware.js";

const router = Router();
let cartsController = new CartController();
router.post("/", async (req, res) => {
	let cart = await cartsController.createCartController();
	res.send({ cart });
});
router.get("/:cid", async (req, res, next) => {
	try {
		let cart = await cartsController.getCartByIdContoller(req);
		res.send(cart);
	} catch (error) {
		return next(error);
	}
});
router.get("/c/:cid", async (req, res, next) => {
	try {
		let carts = await cartsController.getAllProductsFromCartController(req);
		if (!carts) {
			res.send("No se encontró el carritos");
			return;
		}
		res.send(carts);
	} catch (error) {
		return next(error);
	}
});

router.get("/", async (req, res, next) => {
	try {
		let carts = await cartsController.getAllCartsController();
		res.send({ carts });
	} catch (error) {
		return next(error);
	}
});

router.post(
	"/:cid/product/:pid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	async (req, res, next) => {
		try {
			let cart = await cartsController.addProductToCartController(req);
			res.send(cart);
		} catch (error) {
			return next(error);
		}
	}
);

router.delete("/:cid/product/:pid", async (req, res, next) => {
	try {
		let cart = await cartsController.deleteProductFromCartController(req);
		res.send(cart);
	} catch (error) {
		return next(error);
	}
});

router.delete("/:cid", async (req, res, next) => {
	try {
		let cart = await cartsController.cleanCartController(req);
		res.send(cart);
	} catch (error) {
		return next(error);
	}
});

router.post(
	"/purchase/:cid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	async (req, res, next) => {
		try {
			const result = await cartsController.procesPurchaseController(req, res);
			res.send(result);
		} catch (error) {
			return next(error);
		}
	}
);

export default router;
