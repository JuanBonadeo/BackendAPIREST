import ProductManager from "../daos/mongodb/managers/ProductManager.class.js";

const productManager = new ProductManager()

const getProducts = async (req,res) =>{
    try{
        let limit = Number(req.query.limit) || 10;
        let page = Number(req.query.page) || 1;
        let sort = Number(req.query.sort) || 0;
        let filtro = req.query.filtro || '';
        let filtroVal = req.query.filtroVal || '';
        let stock = req.query.stock;
        if (stock === "true") {
          stock = true;
        } else if (stock === "false") {
          stock = false;
        }
        let products = await productManager.getProducts(
          limit,
          page,
          sort,
          filtro,
          filtroVal,
          stock
        );
        res.send(products);
        }catch(error){
            res.status(400).send({status: "error", details: "Hubo un error al traer los productos-"})
        }
}

const getProductById= async (req,res) =>{
  try{
    let id = req.params.pid;
    let product = await productManager.getProductById(id);

    if (!product) {
        res.send("No se encontró el producto");
        return;
    }
    res.send(product); // Se envian los productos en forma de objeto como pide la consigna}
  }catch(error){
    res.status(400).send({status: "error", details: "Hubo un error al traer producto-"})
}
}

const addProduct= async (req,res) =>{
  try{
    let newProduct = req.body;
    await productManager.addProduct(newProduct);
    res.send({ status: "success" });
  }catch(error){
    res.status(400).send({status: "error", details: "Hubo un error al agregar los productos-"})
}
}
const updateProduct= async (req,res) =>{
  try{
    let id = req.params.pid;
    let newProduct = req.body;
    await productManager.updateProduct(id, newProduct);
    res.send({ status: "success" });
  }catch(error){
    res.status(400).send({status: "error", details: "Hubo un error al actualizar producto-"})
}
}
const deleteProduct= async (req,res) =>{
  try{
    let id = req.params.pid;
    await productManager.deleteProduct(id);
    res.send({ status: "success" });
  }catch(error){
    res.status(400).send({status: "error", details: "Hubo un error al eliminar producto-"})
}
}



export default {
    getProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
    
}