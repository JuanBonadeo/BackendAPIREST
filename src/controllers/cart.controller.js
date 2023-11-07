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
      res.send({  status: 'success', result })
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
      res.send({ result })
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
      if (!result || result == undefined) {
        CustomError.createError({
          name: 'cannot find cart with that cid',
          cause: 'cart not found in database',
          message: 'please check the cid, or try with other',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      res.send(result)
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async getAllCartsController (req, res, next) {
    try {
      const result = await this.cartService.getAllCartService()
      res.send({ result })
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
      if (!product || product == undefined) {
        CustomError.createError({
          name: 'cannot find product with that id',
          cause: 'product not found in database',
          message: 'please check the id, or try with other',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
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
      res.send({ status: 'success', result })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async deleteProductFromCartController (req, res, next) {
    try {
      const cid = req.params.cid
      const pid = req.params.pid
      if (!mongoose.isValidObjectId(cid) || !mongoose.isValidObjectId(pid)) {
        CustomError.createError({
          name: 'cannot search product with that cid or id',
          cause: 'type of CID expected is a yuyoID',
          message: 'they must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }

      const result = await this.cartService.deleteProductFromCartService(cid, pid)
      if (!result || result == undefined) {
        CustomError.createError({
          name: 'cannot find cart with that cid or the pid',
          cause: 'cart not found in database',
          message: 'please check the cid and the pid, or try with other',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      res.send({ status: 'success', result })
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
      if (!result || result == undefined) {
        CustomError.createError({
          name: 'cannot find cart with that cid',
          cause: 'cart not found in database',
          message: 'please check the cid, or try with other',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      res.send({ status: 'success', result })
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
      const cart = await this.cartService.getCartByIdService(cid)
      if (cart.products.length === 0) {
        CustomError.createError({
          name: 'the cart is empty',
          cause: 'cart not found in database',
          message: 'try with adding some products to the cart',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      const result = await this.cartService.procesPurchaseService(cid, user, res)
      if(!result) {
        CustomError.createError({
          name: 'cannot find cart with that cid',
          cause: 'cart not found in database',
          message: 'please check the cid, or try with other',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      req.logger.info(`New purchase of ${user.name} `)
      let html = `<h1>Correo de Aviso de Compra Finzalizada - ${user.name}</h1>`
        html = html.concat(
          `<div><h1>Se le informa que se ah completado exitosamente su compra del carrito</div>`);
        let asunto="Correo de Aviso de compra realizada";
        this.mail.send(user,asunto,html);
      res.send({ status: 'success', result })
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
