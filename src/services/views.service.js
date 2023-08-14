import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";
import CartManager from "../daos/mongodb/managers/CartManager.class.js";

export default class ViewsService {
    constructor(){
        this.productDao = new ProductManager()
        this.cartDao = new CartManager()
    }
    async productsViewService(limit,page,sort,filtro,filtroVal){
      const products = this.productDao.getProducts(limit,page,sort,filtro,filtroVal)
      return products
    }
    async productViewService(id){
      let product = await this.productDao.getProductById(id)
      return product
    }
    async cartViewControllerService(id){
        const cart = await this.cartDao.getAllProductsFromCart(id);
        return cart
    }
    async Service(){
      
    }
    async Service(){
      
    }
  
  } 