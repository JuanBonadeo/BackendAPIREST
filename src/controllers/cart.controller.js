import CartService from "../services/carts.service.js";
import CustomError from "../services/errors/Error/CustomError.class.js";
import { ErrorEnum } from "../services/errors/enum/enums.js";
import { generateErrorInfoProduct, generateErrorID } from "../services/errors/info.js";
import mongoose from "mongoose";

export default class CartsController {
  constructor() {
    this.cartService = new CartService();
  }

  async createCartController(req, res, next) {
    try {
      const result = await this.cartService.createCartService();
      return result;
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }

  async getCartByIdContoller(req, res, next) {
    try {
      const cid = req.params.cid;
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: "cannot search product with that cid",
          cause: "type of CID expected is a yuyoID",
          message: "it must be a yuyoId",
          code: ErrorEnum.PARAM_ERROR,
        });
      }
      const result = await this.cartService.getCartByIdService(cid);
      return result;
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }

  async getAllProductsFromCartController(req, res, next) {
    try {
      const cid = req.params.cid;
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: "cannot search product with that cid",
          cause: "type of CID expected is a yuyoID",
          message: "it must be a yuyoId",
          code: ErrorEnum.PARAM_ERROR,
        });
      }
      const result = await this.cartService.getAllProductsFromCartController(cid);
      return result;
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }
  async getAllCartsController(req, res, next) {
    try {
      const result = await this.cartService.getAllCartService();
      return result;
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }
  }
  async addProductToCartController(req, res, next) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      if (!mongoose.isValidObjectId(pid)) {
        CustomError.createError({
          name: "cannot search product with that cid or id",
          cause: "type of ID expected is a yuyoID",
          message: "they must be a yuyoId",
          code: ErrorEnum.PARAM_ERROR,
        });
      }
      const result = await this.cartService.addProductToCartService(cid, pid);
      return result
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }

  async deleteProductFromCartController(req, res, next) {
    try {
      const cid = req.params.cid;
      const pid = req.params.pid;
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: "cannot search product with that cid or id",
          cause: "type of CID expected is a yuyoID",
          message: "they must be a yuyoId",
          code: ErrorEnum.PARAM_ERROR,
        });
      }
      const result = await this.cartService.deleteProductFromCartService(cid, pid);
      return result
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }
  async cleanCartController(req, res, next) {
    try {
      const cid = req.params.cid;
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: "cannot search product with that cid",
          cause: "type of CID expected is a yuyoID",
          message: "it must be a yuyoId",
          code: ErrorEnum.PARAM_ERROR,
        });
      }
      const result = await this.cartService.cleanCartService(cid);
      return result
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }
  async procesPurchaseController(req, res, next) {
    try {
      const user = req.user.email
      const cid = req.params.cid;
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: "cannot search product with that cid",
          cause: "type of CID expected is a yuyoID",
          message: "it must be a yuyoId",
          code: ErrorEnum.PARAM_ERROR,
        });
      }
      const result = await this.cartService.procesPurchaseService(cid, user, res);
      return result
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }

  }
  async printTicketsController(req, res, next) {
    try {
      const user = req.user.email;
      const result = await this.cartService.printTicketsService(user);
      return result
    } catch (error) {
      req.logger.error(error);
      return next(error);
    }
  }

}
