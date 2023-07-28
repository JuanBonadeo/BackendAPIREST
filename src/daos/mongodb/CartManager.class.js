import mongoose from "mongoose";
import { cartModel } from "./models/carts.model.js";
import ProductManager from "./ProductManager.class.js";

export default class CartManager {
  connection = mongoose.connect(
    "mongodb+srv://juancruzbonadeo04:Juan2004@cluster0.enwrd7s.mongodb.net/?retryWrites=true&w=majority"
  );
  productManager = new ProductManager();

  async createCart() {
    const result = await cartModel.create({ products: [] });
    return result;
  }
  async createCartId() {
  const result = await cartModel.create({ products: [] });
  return result._id.toString(); // Retorna el ID del carrito creado como una cadena
}


  async getCartById(cid) {
    const result = await cartModel.findOne({ _id: cid }).populate("products.product");
    console.log(result);
    return result;
  }
  
  async getAllProductsFromCart (cid) {
    const result=await cartModel.findOne({
      _id: cid
      }).populate('products.product').lean();
      console.log(result)
      return result;
  };

  async getAllCarts() {
    const result = await cartModel.find();
    return result;
  }

  async addProductToCart(cid, pid, quantity = 1) {
    const cart = await this.getCartById(cid);
    const cartProduct = cart.products.find(
      (p) => p.product._id.toString() === pid
    );

    if (cartProduct) {
      cart.products.map((p) => {
        if (p.product._id.toString() === pid) {
          p.quantity = p.quantity + quantity;
        }
        return p;
      });
    } else {
      cart.products.push({ product: pid, quantity });
    }
    await cart.save();
    return;
  }
  
  async deleteProductFromCart(cid, pid) {
    const cart = await this.getCartById(cid);
    cart.products.pull(pid);
    await cart.save();
    return true 
  }

  async deleteAllProductsFromCart(cid) {
    const cart = await this.getCartById(cid);
    cart.products = [];
    await cart.save();
    return;
  }
  
  
}

