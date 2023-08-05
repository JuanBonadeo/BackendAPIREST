import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";
import CartManager from "../daos/mongodb/managers/CartManager.class.js";

const productManager = new ProductManager()
const cartManager = new CartManager()

const getProducts=async (req,res)=>{
    

}

export default {
    getProducts
}