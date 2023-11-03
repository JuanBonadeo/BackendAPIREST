import CartManager from '../daos/mongodb/managers/CartManager.class.js'
import TicketManager from '../daos/mongodb/managers/TicketManager.js'
import CustomError from './errors/Error/CustomError.class.js'
import { ErrorEnum } from '../services/errors/enum/enums.js'

export default class CartService {
  constructor () {
    this.cartDao = new CartManager()
    this.ticketDao = new TicketManager()
  }

  async createCartService () {
    const result = this.cartDao.createCart()
    return result
  }

  async getCartByIdService (cid, req,res,next) {
    try {
      const result = await this.cartDao.getCartById(cid)
      if(!result) {
        CustomError.createError({
          name: 'Cannot search cart with that id',
          cause: 'Its doesnt exists',
          message: 'Cart not ofund in the db',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      return result
    }catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async getAllProductsFromCartService (cid) {
    const result = await this.cartDao.getCartById(cid)
    if (!result) {
      res.send('No se encontró el carrito')
      return
    }
    return result
  }

  async getAllCartService () {
    const result = await this.cartDao.getAllCarts()
    return result
  }

  async addProductToCartService (cid, pid) {
    const result = await this.cartDao.addProductToCart(cid, pid)
    return result
  }

  async  deleteProductFromCartService (cid, pid) {
    const result = await this.cartDao.deleteProductFromCart(cid, pid)
    return result
  }

  async cleanCartService (cid) {
    const result = await this.cartDao.deleteAllProductsFromCart(cid)
    return result
  }

  async procesPurchaseService (cid, user, res) {
    const result = await this.cartDao.procesPurchase(cid, user, res)
    const ticket = await this.ticketDao.createTicket(user, result.totalAmount, result.productsInStock)
    return ticket
  }

  async printTicketsService (user) {
    const result = await this.ticketDao.printTicketByUser(user)
    return result
  }
}
