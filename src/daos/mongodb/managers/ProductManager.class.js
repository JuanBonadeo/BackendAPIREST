import mongoose from "mongoose";
import { productsModel } from "../models/products.model.js";
import { faker } from "@faker-js/faker";
import { v4 as uuidv4 } from 'uuid'; 

export default class ProductManager {
  connection = mongoose.connect(
    "mongodb+srv://juancruzbonadeo04:Juan2004@cluster0.enwrd7s.mongodb.net/?retryWrites=true&w=majority"
  );

  async addProduct(product) {
      let result = await productsModel.create(product);
      return result;
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
    
    
    let result = await productsModel.paginate(whereOptions, {
      limit: limit,
      page: page,
      sort: { price: sort },
      lean:true
    });
    return result;
  }

  

  async getProductById(id) {
    let result = await productsModel.findOne({ _id: id }).lean();
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

  async generate100Products  (){
    const products = [];
    for (let i = 0; i < 100 ; i++){
          const newProduct= {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: uuidv4(),
                category: faker.commerce.department(),
                price: faker.commerce.price({ min: 1500, max: 1000000 }),
                stock: faker.number.int({ min: 0, max: 50 })
          }
          products.push(newProduct)
    }   
    const result = await this.addProduct(products)
    return result
}

}



  