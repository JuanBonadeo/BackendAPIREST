import ViewsService from '../services/views.service.js'

export default class ViewsController {
  constructor () {
    this.viewsService = new ViewsService()
  }

  async productsViewController (req, res, next) {
    try {
      const page = req.query.page || 1
      const limit = req.query.limit || 10
      const sort = req.query.sort
      const filtro = req.query.filtro
      const filtroVal = req.query.filtroVal
      const products = await this.viewsService.productsViewService(limit, page, sort, filtro, filtroVal)
      products.prevLink = products.hasPrevPage ? `http://localhost:8080/views/products?page=${products.prevPage}&limit=${products.limit}` : ''
      products.nextLink = products.hasNextPage ? `http://localhost:8080/views/products?page=${products.nextPage}&limit=${products.limit}` : ''
      return products
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }

  async productViewController (req, res, next) {
    try {
      const id = req.params.id
      const product = await this.viewsService.productViewService(id)
      return product
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }

  async cartViewController (req, res, next) {
    try {
      const id = req.params.id
      const cart = await this.viewsService.cartViewService(id)
      return cart
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }

  async allPurchasesViewController (req, res, next) {
    try {
      const user = req.user.email
      const ticket = await this.viewsService.allPurchasesService(user)
      return ticket
    } catch (error) {
      req.logger.error(error)
      return next(error)
    }
  }
}
