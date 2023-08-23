import mongoose from "mongoose";
import { cartModel } from "../models/carts.model.js";
import { ticketModel } from "../models/tickets.model.js";
import ProductService from "../../../services/products.service.js";

export default class CartManager {
	connection = mongoose.connect(
		"mongodb+srv://juancruzbonadeo04:Juan2004@cluster0.enwrd7s.mongodb.net/?retryWrites=true&w=majority"
	);
	constructor() {
		this.productService = new ProductService();
	}
	
	async createCart() {
		const result = await cartModel.create({ products: [] });
		return result;
	}
	async createCartId() {
		const result = await cartModel.create({ products: [] });
		return result._id.toString(); // Retorna el ID del carrito creado como una cadena
	}
	async getCartById(cid) {
		const result = await cartModel
			.findOne({ _id: cid })
			.populate("products.product");
		return result;
	}

	async getAllProductsFromCart(cid) {
		const result = await cartModel
			.findOne({
				_id: cid,
			})
			.populate("products.product")
			.lean();
		return result;
	}

	async getAllCarts() {
		const result = await cartModel.find();
		return result;
	}

	async addProductToCart(cid, pid, quantity = 1) {
		const cart = await this.getCartById(cid);
		const cartProduct = cart.products.find(
			(p) => p.product._id.toString() === pid
		);

		if (cartProduct) {
			cart.products.map((p) => {
				if (p.product._id.toString() === pid) {
					p.quantity = p.quantity + quantity;
				}
				return p;
			});
		} else {
			cart.products.push({ product: pid, quantity });
		}
		await cart.save();
		return;
	}

	async deleteProductFromCart(cid, pid) {
		const cart = await this.getCartById(cid);
		cart.products.map((p) => {
			if (p.quantity > 0) {
				p.quantity = p.quantity - 1;
			}else {
				cart.products.pull(pid);
			}
		});
		await cart.save();
		return true;
	}

	async deleteAllProductsFromCart(cid) {
		const cart = await this.getCartById(cid);
		cart.products = [];
		await cart.save();
		return;
	}

	async procesPurchase(cid) {
		let totalAmount = 0;
		let productsInStock = [];
    		let productsOutOfStock = [];
		const result = await this.getCartById(cid);
		
		if ((result.products.length === 0)) {
			const result = "No hay productos en carrito";
			return result;
		}
		for ( let element of result.products) {
			const product = element.product;
        		const quantity = element.quantity;
			if (product.stock >= quantity){
				await this.productService.updateProductService(product.id, {
				stock: product.stock - quantity
				})
				productsInStock.push({productId: product.id, quantity: quantity})
			} else {
				productsOutOfStock.push(product.id)
			}
			totalAmount += quantity * product.price;
		}
		return { productsInStock, totalAmount, productsOutOfStock}
	}
	
}

