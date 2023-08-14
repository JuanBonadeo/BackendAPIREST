import ProductService from "../services/products.service.js";

export default class ProductController {
  constructor() {
    this.productService = new ProductService();
  }
  async getProductsController(req) {
    let limit = Number(req.query.limit) || 10;
    let page = Number(req.query.page) || 1;
    let sort = Number(req.query.sort) || 0;
    let filtro = req.query.filtro || "";
    let filtroVal = req.query.filtroVal || "";
    let stock = req.query.stock;
    if (stock === "true") {
      stock = true;
    } else if (stock === "false") {
      stock = false;
    }
    const result = await this.productService.getProductsService(
      limit,
      page,
      sort,
      filtro,
      filtroVal,
      stock
    );
    return result;
  }

  async getProductsByIdController(req) {
    let id = req.params.id;
    if (!id) {
      return {
        error: "id vacio",
      };
    }
    const result = await this.productService.getProductsByIdService(id);
    return result;
  }
  async addProductController(req) {
    const product = req.body;
    const result = await this.productService.addProductService(product);
    return result;
  }
  async updateProductController(req) {
    let id = req.params.pid;
    let product = req.body;
    const result = await this.productService.updateProductService(id, product);
    return result;
  }
  async deleteProductController(req) {
    let id = req.params.pid;
    const result = await this.productService.deleteProductService(id);
    return result;
  }

}
