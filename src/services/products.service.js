import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";
import CustomError from "../services/errors/Error/CustomError.class.js";
import { ErrorEnum } from "../services/errors/enum/enums.js";


export default class ProductService {

  constructor(){
      this.productDao= new ProductManager();
  }
  async getProductsService (limit, page, sort, filtro, filtroVal, stock) {
    const result = await this.productDao.getProducts(
      limit,
      page,
      sort,
      filtro,
      filtroVal,
      stock
    );
    return result
  }
  async getProductsByIdService (id){
      let result = await this.productDao.getProductById(id);
      return result // Se envian los productos en forma de objeto como pide la consigna}
  }
  async addProductService(product){
    let result = await this.productDao.addProduct(product);
    return result
    }
  async updateProductService(id, product){
    let result = await this.productDao.updateProduct(id, product);
    return result
  }
  async deleteProductService(id){
    let result = await this.productDao.deleteProduct(id)
    return result
  }  
  async generateProductsService(){
    let result = await this.productDao.generate100Products()
    return result
  }


}

 






