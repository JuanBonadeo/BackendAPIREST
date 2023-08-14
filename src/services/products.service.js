import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";


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
  async getProductByIdService (id){
    let product = await this.productDao.getProductById(id);
    if (!product) {
        res.send("No se encontró el producto");
        return;
    }
    return result // Se envian los productos en forma de objeto como pide la consigna}
  }
  async addProductService(product){
    let result = await this.productDao.addProduct(product);
    return result
    }
  async updateProductService(id, product){
    result = await this.productDao.updateProduct(id, product);
    return result
  }
  async deleteProductService(id){
    result = await this.productDao.deleteProduct(id)
    return result
  }
}

 






