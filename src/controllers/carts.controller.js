
import CartManager from "../daos/mongodb/managers/CartManager.class.js";
let cartManager = new CartManager();

const getCartById= async (req,res) =>{
    try{
        let cid = req.params.cid;

        let cart = await cartManager.getCartById(cid);
      
        if (!cart) {
          res.send("No se encontró el carrito");
          return;
        }
      
        res.send(cart);
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al traer producto-"})
  }
}

const getAllProductsFromCart= async (req,res) =>{
    try{
      let cid = req.params.cid;
      let cart = await cartManager.getAllProductsFromCart(cid);
      if (!cart) {
        res.send("No se encontró el carrito");
        return;
      }
      res.send(cart);
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al traer productos"})
  }
}

const getCarts= async (req,res) =>{
    try{
      let carts = await cartManager.getAllCarts();
      if (!carts) {
        res.send("No se encontró el carrito");
        return;
      }
      res.send(carts);
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al traer carritos-"})
  }
}

const createCart= async (req,res) =>{
    try{
      await cartManager.createCart();

  res.send({ status: "success" });
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al crear carrito-"})
  }
}

const addProductToCart= async (req,res) =>{
    try{
      const cid = req.params.cid;
      const pid = req.params.pid;
      const cart = await cartManager.addProductToCart(cid,pid)
      res.send(cart)
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al traer producto-"})
  }
}

const updateQuantity= async (req,res) =>{
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity
  try{
    const cart = await cartManager.updateProduct(cid,pid,quantity)
    res.send({ status: "success" });
  } catch(e) {
    res.status(404).send({error: e.message})
  }
}

const deleteProductFromCart= async (req,res) =>{
    try{
      const cid = req.params.cid;
      const pid = req.params.pid;
      const cart = await cartManager.deleteProductFromCart(cid,pid)
      if (!cart) {
        res.status(404).send({ status: "error", message: "Cart or product not found" });
        return;
    }
      res.send({ status: "success" });
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al agregar producto al carrito-"})
  }
}

const cleanCart= async (req,res) =>{
    try{
        let cid = req.params.cid;
        await cartManager.deleteAllProductsFromCart(cid);
        res.send({ status: "success" });
    }catch(error){
      res.status(400).send({status: "error", details: "Hubo un error al traer producto-"})
  }
}


export default{
    getCartById,
    getAllProductsFromCart,
    getCarts,
    createCart,
    addProductToCart,
    updateQuantity,
    deleteProductFromCart,
    cleanCart
}