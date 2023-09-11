import { Router } from "express";
import __dirname from "../utils.js";
import passport from "passport";

import CartController from "../controllers/cart.controller.js";
import { verificarPerteneciaCarrito } from "./middlewares/carts.Middleware.js";

const router = Router();
let cartsController = new CartController();
router.post("/", async (req, res) => {
	let cart = await cartsController.createCartController(req, res);
	res.send({ cart });
});
router.get("/:cid", passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito, async (req, res) => {
		let cart = await cartsController.getCartByIdContoller(req, res);
		res.send(cart);
	});
router.get("/c/:cid", async (req, res) => {
	let carts = await cartsController.getAllProductsFromCartController(req, res);
	res.send(carts);
});

router.get("/", async (req, res) => {
	let carts = await cartsController.getAllCartsController(req, res);
	res.send({ carts });
});

router.post(
	"/:cid/product/:pid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	async (req, res, next) => {
		let cart = await cartsController.addProductToCartController(req, res, next);
		res.send(cart);
	}
);

router.delete("/:cid/product/:pid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	async (req, res) => {
		let cart = await cartsController.deleteProductFromCartController(req, res);
		res.send(cart);
	});

router.delete("/:cid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito, async (req, res) => {
		let cart = await cartsController.cleanCartController(req);
		res.send(cart);
	});

router.post(
	"/purchase/:cid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	async (req, res, next) => {
		const result = await cartsController.procesPurchaseController(req, res);
		res.send(result);
	}
);

export default router;
