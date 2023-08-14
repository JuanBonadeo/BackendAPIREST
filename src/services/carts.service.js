
import CartManager from "../daos/mongodb/managers/CartManager.class.js";


export default class CartService {
  constructor(){
    this.cartDao = new CartManager();
  }
  async createCartService(){
    const result = this.cartDao.createCart()
    return result
  }
  async getCartByIdService(cid){
    const result = await this.cartDao.getCartById(cid)
    if (!cart) {
      res.send("No se encontró el carrito");
      return;
    }
    return result
  }
  async getAllProductsFromCartService(cid){
    const result = await this.cartDao.getCartById(cid)
    if (!result) {
      res.send("No se encontró el carrito");
      return;
    }
    return result
  }
  async getAllCartService(){
    const result = await this.cartDao.getAllCarts()
    return result
  }
  async addProductToCartService(cid, pid) {
    const result = await this.cartDao.addProductToCart(cid, pid);
    return result;
  }
  async deleteProductFromCartService(cid,pid){
    const result = await this.cartDao.deleteProductFromCart(cid,pid)
    return result
  }
  async cleanCartService(cid){
    const result = await this.cartDao.deleteAllProductsFromCart(cid)
    return result
  }
  async createTicketService(cid,user,res){
    const result = await this.cartDao.createTicket(cid,user,res)
    return result
  }

}




