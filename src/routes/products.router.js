import { Router } from "express";
import __dirname from "../utils.js";
import productsControllers from "../controllers/products.controllers.js";


// no tienen que haber validaciones, si pueden haber middlewares
const router = Router();

router.get("/", productsControllers.getProducts);

router.get("/:pid", productsControllers.getProductById);

router.post("/", productsControllers.addProduct);

router.put("/:pid", productsControllers.updateProduct);

router.delete("/:pid", productsControllers.deleteProduct);

export default router;
