import mongoose from "mongoose";
import { productsModel } from "./models/products.model.js";

export default class ProductManager {
  connection = mongoose.connect(
    "mongodb+srv://juancruzbonadeo04:Juan2004@cluster0.enwrd7s.mongodb.net/?retryWrites=true&w=majority"
  );

  async addProduct(product) {
    try {
      let result = await productsModel.create(product);
      return result;
    } catch (e) {
      console.log(e);
      return e;
    }
  }

  async getProducts(
    limit = 10,
    page = 1,
    sort = 0,
    filtro = null,
    filtroVal = null,
  ) {
    let whereOptions = {};
    
    if (filtro != "" && filtroVal != "") {
      whereOptions = { [filtro]: filtroVal };
    }
    
    console.log(limit, page, sort);
    let result = await productsModel.paginate(whereOptions, {
      limit: limit,
      page: page,
      sort: { price: sort },
      lean:true
    });
    return result;
  }

  

  async getProductById(id) {
    let result = await productsModel.findOne({ _id: id });
    return result;
  }

  async updateProduct(id, updatedProduct) {
    let result = await productsModel.updateOne(
      { _id: id },
      { $set: updatedProduct }
    );
    return result;
  }

  async deleteProduct(id) {
    let result = await productsModel.deleteOne({ _id: id });
    return result;
  }
}
