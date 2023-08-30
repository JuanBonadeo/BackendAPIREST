import ProductService from "../services/products.service.js";
import CustomError from "../services/errors/Error/CustomError.class.js";
import { ErrorEnum } from "../services/errors/enum/enums.js";
import { generateErrorInfoProduct, generateErrorID } from "../services/errors/info.js";
import mongoose from "mongoose";

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

	async getProductsByIdController(req, res) {
		let id = req.params.id;
		if (!mongoose.isValidObjectId(id)) {
			CustomError.createError({
				name: "cannot search product with that id",
				cause: generateErrorID(id),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
		}
		const result = await this.productService.getProductsByIdService(id);
		return result;
	}
	async addProductController(req, res) {
		const product = req.body;
		if (!product.title || !product.price || !product.stock || !product.code || !product.category) {
			CustomError.createError({
				name: "product cant be added",
				cause: generateErrorInfoProduct(product),
				message: "error trying to create product",
				code: ErrorEnum.BODY_ERROR,
			});
		}
		const result = await this.productService.addProductService(product);
		return result;
	}
	async updateProductController(req) {
		let id = req.params.pid;
		if (!mongoose.isValidObjectId(id)) {
			CustomError.createError({
				name: "cannot search product with that id",
				cause: generateErrorID(id),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
		}
		let product = req.body;
		const result = await this.productService.updateProductService(id, product);
		return result;
	}
	async deleteProductController(req) {
		let id = req.params.pid;
		if (!mongoose.isValidObjectId(id)) {
			CustomError.createError({
				name: "cannot search product with that id",
				cause: generateErrorID(id),
				message: "it must be a yuyoId",
				code: ErrorEnum.PARAM_ERROR,
			});
		}
		const result = await this.productService.deleteProductService(id);
		return result;
	}
	async generateProductsController() {
		const result = await this.productService.generateProductsService();
		return result;
	}
}