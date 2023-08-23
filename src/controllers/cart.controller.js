import CartService from "../services/carts.service.js";
import CustomError from "../services/errors/Error/CustomError.class.js";
import { ErrorEnum } from "../services/errors/enum/enums.js";
import { generateErrorInfoProduct, generateErrorID } from "../services/errors/info.js";
import mongoose from "mongoose";

export default class CartsController {
  constructor() {
    this.cartService = new CartService();
  }

  async createCartController() {
    const result = await this.cartService.createCartService();
    return result;
  }

  async getCartByIdContoller(req, res, next) {
    const cid = req.params.cid;
    if(!mongoose.isValidObjectId(cid)){
      CustomError.createError({
				name: "cannot search product with that cid",
				cause: generateErrorID(cid),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
    }
    const result = await this.cartService.getCartByIdService(cid);
    return result;
  } 

  async getAllProductsFromCartController(req) {
    const cid = req.params.cid;
    if(!mongoose.isValidObjectId(cid)){
      CustomError.createError({
				name: "cannot search product with that cid",
				cause: generateErrorID(cid),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
    }
    const result = await this.cartService.getAllProductsFromCartController(cid);
    return result;
  }
  async getAllCartsController() {
    const result = await this.cartService.getAllCartService();
    return result;
  }
  async addProductToCartController(req, res){
    const cid = req.params.cid;
    const pid = req.params.pid;
    if(!mongoose.isValidObjectId(pid)){
      CustomError.createError({
				name: "cannot search product with that cid or id",
				cause: generateErrorID(pid),
				message: "they must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
    }
    const result = await this.cartService.addProductToCartService(cid, pid);
    return result
  }

  async deleteProductFromCartController(req, res, next){
    const cid = req.params.cid;
    const pid = req.params.pid;
    if(!mongoose.isValidObjectId(cid) ){
      CustomError.createError({
				name: "cannot search product with that cid or id",
				cause: generateErrorID(cid),
				message: "they must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
    }
    const result = await this.cartService.deleteProductFromCartService(cid, pid);
    return result
  }
  async cleanCartController(req){
    const cid = req.params.cid;
    if(!mongoose.isValidObjectId(cid)){
      CustomError.createError({
				name: "cannot search product with that cid",
				cause: generateErrorID(cid),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
    }
    const result = await this.cartService.cleanCartService(cid);
    return result
  }
  async procesPurchaseController(req,res){
    const user = req.user.email
    const cid = req.params.cid;
    if(!mongoose.isValidObjectId(cid)){
      CustomError.createError({
				name: "cannot search product with that cid",
				cause: generateErrorID(cid),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
    }
    const result = await this.cartService.procesPurchaseService(cid, user,res);
    return result
  }
  async printTicketsController(req,res){
    const user = req.user.email;
    const result = await this.cartService.printTicketsService(user);
    return result
  }

}
