import ProductManager from '../daos/mongodb/managers/ProductManager.class.js'
import CartManager from '../daos/mongodb/managers/CartManager.class.js'
import TicketManager from '../daos/mongodb/managers/TicketManager.js'
import ProductController from '../controllers/product.controller.js'

export default class ViewsService {
  constructor () {
    this.productDao = new ProductManager()
    this.cartDao = new CartManager()
    this.ticketDao = new TicketManager()
    this.productController = new ProductController()
  }

  async productsViewService (limit, page, sort, filtro, filtroVal) {
    const products = this.productDao.getProducts(limit, page, sort, filtro, filtroVal)
    return products
  }

  async productViewService (id) {
    const product = await this.productController.getProductsByIdController(id)
    return product
  }

  async cartViewService (id) {
    const cart = await this.cartDao.getAllProductsFromCart(id)
    return cart
  }

  async allPurchasesService (user) {
    const ticket = await this.ticketDao.printTicketByUser(user)
    return ticket
  }
}
