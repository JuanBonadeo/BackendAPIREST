import CartService from '../services/carts.service.js'
import CustomError from '../services/errors/Error/CustomError.class.js'
import { ErrorEnum } from '../services/errors/enum/enums.js'
import mongoose from 'mongoose'
import ProductService from '../services/products.service.js'
import Mail from '../helpers/mail.js'

export default class CartsController {
  constructor () {
    this.cartService = new CartService()
    this.productService = new ProductService()
    this.mail = new Mail()
  }

  async createCartController (req, res, next) {
    try {
      const result = await this.cartService.createCartService()
      return result
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }

  async getCartByIdContoller (req, res, next) {
    try {
      const cid = req.params.cid
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: 'cannot search product with that cid',
          cause: 'type of CID expected is a yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const result = await this.cartService.getCartByIdService(cid)
      return result
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }

  async getAllProductsFromCartController (req, res, next) {
    try {
      const cid = req.params.cid
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: 'cannot search product with that cid',
          cause: 'type of CID expected is a yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const result = await this.cartService.getAllProductsFromCartService(cid)
      if (!result) {
        CustomError.createError({
          name: 'cid not found',
          cause: 'cart not found in database',
          message: 'please check the cid',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async getAllCartsController (req, res, next) {
    try {
      const result = await this.cartService.getAllCartService()
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async addProductToCartController (req, res, next) {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      if (!mongoose.isValidObjectId(pid)) {
        CustomError.createError({
          name: 'cannot search product with that cid or id',
          cause: 'type of ID expected is a yuyoID',
          message: 'they must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const product = await this.productService.getProductsByIdService(pid)
      const owner = product.owner
      if (owner === req.user.email) {
        CustomError.createError({
          name: 'you dont have acces',
          cause: 'You cant add your own product',
          message: 'try with products of others owners',
          code: ErrorEnum.ROLE_ERROR
        })
      }

      const result = await this.cartService.addProductToCartService(cid, pid)
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async deleteProductFromCartController (req, res, next) {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: 'cannot search product with that cid or id',
          cause: 'type of CID expected is a yuyoID',
          message: 'they must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }

      const result = await this.cartService.deleteProductFromCartService(cid, pid)
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async cleanCartController (req, res, next) {
    try {
      const cid = req.params.cid
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: 'cannot search product with that cid',
          cause: 'type of CID expected is a yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const result = await this.cartService.cleanCartService(cid)
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async procesPurchaseController (req, res, next) {
    try {
      const user = req.user.email
      const cid = req.params.cid
      if (!mongoose.isValidObjectId(cid)) {
        CustomError.createError({
          name: 'cannot search product with that cid',
          cause: 'type of CID expected is a yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const result = await this.cartService.procesPurchaseService(cid, user, res)
      req.logger.info(`New purchase of ${req.user.name} `)
      let html = `<h1>Correo de Aviso de Compra Finzalizada - ${user.name}</h1>`
        html = html.concat(
          `<div><h1>Se le informa que se ah completado exitosamente su compra del carrito</div>`);
        let asunto="Correo de Aviso de compra realizada";
        this.mail.send(user,asunto,html);
      return result
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async printTicketsController (req, res, next) {
    try {
      const user = req.user.email
      const result = await this.cartService.printTicketsService(user)
      return result
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }
}
