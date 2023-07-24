import { Router } from "express";
import CartManager from "../daos/mongodb/CartManager.class.js";
import __dirname from "../utils.js";

let cartManager = new CartManager();

const router = Router();

router.get("/:cid", async (req, res) => {
  let cid = req.params.cid;

  let cart = await cartManager.getCartById(cid);

  if (!cart) {
    res.send("No se encontró el carrito");
    return;
  }

  res.send(cart);
});

router.get("/c/:cid", async (req, res) => {
  let cid = req.params.cid;

  let cart = await cartManager.getAllProductsFromCart(cid);

  if (!cart) {
    res.send("No se encontró el carrito");
    return;
  }

  res.send(cart);
});

router.get("/", async (req, res) => {
  let carts = await cartManager.getAllCarts();

  if (!carts) {
    res.send("No se encontró el carrito");
    return;
  }

  res.send(carts);
});

router.post("/", async (req, res) => {
  await cartManager.createCart();

  res.send({ status: "success" });
});

router.post("/:cid/product/:pid", async (req, res) => { 
  const cid = req.params.cid;
  const pid = req.params.pid;
  const cart = await cartManager.addProductToCart(cid,pid)
  res.send(cart)

  
});

router.put("/:cid/product/:pid", async (req, res) => { 
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity
  try{
    const cart = await cartManager.updateProduct(cid,pid,quantity)
    res.send({ status: "success" });
  } catch(e) {
    res.status(404).send({error: e.message})
  }
  
});

router.delete("/:cid/product/:pid", async (req, res) => {
  let cid = req.params.cid;
  let pid = req.params.pid;

  await cartManager.deleteProductFromCart(cid, pid);

  res.send({ status: "success" });
});

router.delete("/:cid", async (req, res) => {
  let cid = req.params.cid;
  await cartManager.deleteAllProductsFromCart(cid);
  res.send({ status: "success" });
});

export default router;
