import ProductManager from '../daos/mongodb/managers/ProductManager.class.js'
import CustomError from './errors/Error/CustomError.class.js'
import { ErrorEnum } from './errors/enum/enums.js'

export default class ProductService {
  constructor () {
    this.productDao = new ProductManager()
  }

  async getProductsService (limit, page, sort, filtro, filtroVal, stock) {
    const result = await this.productDao.getProducts(
      limit,
      page,
      sort,
      filtro,
      filtroVal,
      stock
    )
    return result
  }

  async getProductsByIdService(id, req, res, next) {
      const result = await this.productDao.getProductById(id)

  }
  

  async addProductService (product) {
    const result = await this.productDao.addProduct(product)
    return result
  }

  async updateProductService (id, product) {
    const result = await this.productDao.updateProduct(id, product)
    return result
  }

  async deleteProductService (id) {
    const result = await this.productDao.deleteProduct(id)
    return result
  }

  async generateProductsService () {
    const result = await this.productDao.generate100Products()
    return result
  }
  
}
