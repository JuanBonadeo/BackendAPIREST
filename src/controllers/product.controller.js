import ProductService from "../services/products.service.js";
import CustomError from "../services/errors/Error/CustomError.class.js";
import { ErrorEnum } from "../services/errors/enum/enums.js";
import { generateErrorInfoProduct, generateErrorID } from "../services/errors/info.js";
import mongoose from "mongoose";
import config from '../config/config.js'

export default class ProductController {
	constructor() {
		this.productService = new ProductService();
	}
	async getProductsController(req, res, next) {
		try {
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

		} catch (error) {
			req.logger.error(error);
			return next(error);
		}
	}

	async getProductsByIdController(req, res, next) {
		try {
			let id = req.params.id;
			if (!mongoose.isValidObjectId(id)) {
				CustomError.createError({
					name: "cannot search product with that id",
					cause: 'its doesnt exists',
					message: "it must be a yuyoId",
					code: ErrorEnum.PARAM_ERROR,
				});
			}
			const result = await this.productService.getProductsByIdService(id);
			return result;
		} catch (error) {
			req.logger.error(error);
			return next(error);
		}

	}
	async addProductController(req, res, next) {
		try {
			const product = req.body;
			if (req.user.email !== config.adminName) product.owner = req.user.email
			if (!product.title || !product.price || !product.stock || !product.code || !product.category) {
				CustomError.createError({
					name: "product cant be added",
					cause: "One or more properties were completed or invalid",
					message: "error trying to create product",
					code: ErrorEnum.BODY_ERROR,
				});

			}
			const result = await this.productService.addProductService(product);
			return result;
		} catch (error) {
			req.logger.error(error);
			return next(error);
		}

	}
	async updateProductController(req, res, next) {
		try {
			let id = req.params.pid;
			if (!mongoose.isValidObjectId(id)) {
				CustomError.createError({
					name: "cannot search product with that id",
					cause: "type of ID expected, yuyoID",
					message: "it must be a yuyoId",
					code: ErrorEnum.PARAM_ERROR,
				});
			}
			const p = await this.productService.getProductsByIdService(id)
			if (req.user.role == 'premium') {
				if (p.owner !== req.user.email) {
					CustomError.createError({
						name: "you dont have acces",
						cause: "You cant update other owners products",
						message: `try with your own products`,
						code: ErrorEnum.ROLE_ERROR,
					})
				}
			}


			let product = req.body;
			const result = await this.productService.updateProductService(id, product);
			return result;
		} catch (error) {
			req.logger.error(error);
			return next(error);
		}
	}
	async deleteProductController(req, res, next) {
		try {
			let id = req.params.pid;
			if (!mongoose.isValidObjectId(id)) {
				CustomError.createError({
					name: "cannot search product with that id",
					cause: "type of ID expected, yuyoID",
					message: "it must be a yuyoId",
					code: ErrorEnum.PARAM_ERROR,
				});
			}
			const result = await this.productService.deleteProductService(id);
			return result;
		} catch (error) {
			req.logger.error(error);
			return next(error);
		}

	}
	async generateProductsController(req, res, next) {
		try {
			const result = await this.productService.generateProductsService(req, res);
			req.logger.info("100 new products added")
			return result;
		} catch (error) {
			req.logger.error(error);
			return next(error);
		}

	}
}
