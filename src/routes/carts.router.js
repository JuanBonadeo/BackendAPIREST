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
router.get("/:cid", async (req, res) => {
	let cart = await cartsController.getCartByIdContoller(req);
	res.send(cart);
});
router.get("/c", async (req, res) => {
	let carts = await cartsController.getAllProductsFromCartController(req);
	if (!carts) {
		res.send("No se encontró el carritos");
		return;
	}
	res.send(carts);
});

router.get("/", async (req, res) => {
	let carts = await cartsController.getAllCartsController();
	res.send({ carts });
});

router.post("/:cid/product/:pid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	 async (req, res) => {
	let cart = await cartsController.addProductToCartController(req);
	res.send(cart);
});

router.delete("/:cid/product/:pid", async (req, res) => {
	let cart = await cartsController.deleteProductFromCartController(req);
	res.send(cart);
});

router.delete("/:cid", async (req, res) => {
	let cart = await cartsController.cleanCartController(req);
	res.send(cart);
});

router.post("/purchase/:cid",
	passport.authenticate("jwt", { session: false }),
	verificarPerteneciaCarrito,
	async (req,res) => {
	const result = await cartsController.createTicketController(req,res)
	console.log(result)
	res.send(result)
})

export default router;
