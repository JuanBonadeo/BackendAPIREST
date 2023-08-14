import CartService from "../services/carts.service.js";

export default class CartsController {
  constructor() {
    this.cartService = new CartService();
  }

  async createCartController() {
    const result = await this.cartService.createCartService();
    return result;
  }

  async getCartByIdContoller(req) {
    const cid = req.params.cid;
    if (!cid) {
      return {
        error: "debes especificar un id",
      };
    }
    const result = await this.cartService.getCartByIdService(cid);
    return result;
  }

  async getAllProductsFromCartController(req) {
    const cid = req.params.cid;
    const result = await this.cartService.getAllProductsFromCartController(cid);
    return result;
  }
  async getAllCartsController() {
    const result = await this.cartService.getAllCartService();
    return result;
  }
  async addProductToCartController(req){
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await this.cartService.addProductToCartService(cid, pid);
    return result
  }

  async deleteProductFromCartController(req){
    const cid = req.params.cid;
    const pid = req.params.pid;
    const result = await this.cartService.deleteProductFromCartService(cid, pid);
    return result
  }
  async cleanCartController(req){
    const cid = req.params.cid;
    const result = await this.cartService.cleanCartService(cid);
    return result
  }
  async createTicketController(req,res){
    const user = req.user.email
    const cid = req.params.cid;
    const result = await this.cartService.createTicketService(cid, user,res);
    return result
  }


}
