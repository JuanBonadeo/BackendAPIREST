import { Router } from "express";
import __dirname from "../utils.js";
import cartsController from "../controllers/carts.controller.js";


const router = Router();

router.get("/:cid", cartsController.getCartById); 

router.get("/c/:cid", cartsController.getAllProductsFromCart);

router.get("/", cartsController.getCarts);

router.post("/", cartsController.createCart);

router.post("/:cid/product/:pid", cartsController.addProductToCart);

router.put("/:cid/product/:pid", cartsController.updateQuantity);

router.delete("/:cid/product/:pid", cartsController.deleteProductFromCart);

router.delete("/:cid", cartsController.cleanCart);

export default router;
