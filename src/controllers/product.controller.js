import ProductService from '../services/products.service.js'
import CustomError from '../services/errors/Error/CustomError.class.js'
import { ErrorEnum } from '../services/errors/enum/enums.js'
import mongoose from 'mongoose'
import config from '../config/config.js'
import Mail from '../helpers/mail.js'
import { v4 as uuidv4 } from 'uuid'


export default class ProductController {
  constructor () {
    this.productService = new ProductService()
    this.mail = new Mail()
  }

  async getProductsController (req, res, next) {
    try {
      const limit = Number(req.query.limit) || 15
      const page = Number(req.query.page) || 1
      const sort = Number(req.query.sort) || 0
      const filtro = req.query.filtro || ''
      const filtroVal = req.query.filtroVal || ''
      let stock = req.query.stock
      if (stock === 'true') {
        stock = true
      } else if (stock === 'false') {
        stock = false
      }
      const result = await this.productService.getProductsService(
        limit,
        page,
        sort,
        filtro,
        filtroVal,
        stock
      )
      res.send({ result })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async getProductsByIdController (req, res, next) {
    try {
      const id = req.params.id
      if (!mongoose.isValidObjectId(id)) {
        CustomError.createError({
          name: 'cannot search product with that id',
          cause: 'its doesnt exists',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const product = await this.productService.getProductsByIdService(id,req, res, next)
      res.send({ product })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }
  async getProductsByIdForViewController (req, res, next) {
    try {
      const id = req.params.id
      const product = await this.productService.getProductsByIdService(id,req, res, next)
      return product
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async addProductController (req, res, next) {
    try {
      const product = req.body
      product.code = uuidv4()
      if (req.user.email != config.adminName) product.owner = req.user.email
      if (!product.title || !product.price || !product.stock || !product.category || product.price < 0 || product.stock < 0) {
        CustomError.createError({
          name: 'product cant be added',
          cause: 'One or more properties were completed or invalid',
          message: 'error trying to create product',
          code: ErrorEnum.BODY_ERROR
        })
      } else {
        const result = await this.productService.addProductService(product)
        res.send({ status: 'success', result })
      }
    } catch (error) {
      req.logger.error(error)   
      next(error)
    }
  }

  async updateProductController (req, res, next) {
    try {
      const id = req.params.pid
      if (!mongoose.isValidObjectId(id)) {
        CustomError.createError({
          name: 'cannot search product with that id',
          cause: 'type of ID expected, yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const p = await this.productService.getProductsByIdService(id)
      if (p == undefined){
        CustomError.createError({
          name: 'cannot find product with that id',
          cause: 'product not found in database',
          message: 'please check the id, or try with other',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      if (req.user.role === 'premium') {
        if (p.owner !== req.user.email) {
          CustomError.createError({
            name: 'you dont have acces',
            cause: 'You cant update other owners products',
            message: 'try with your own products',
            code: ErrorEnum.ROLE_ERROR
          })
        }
      }

      const product = req.body
      const result = await this.productService.updateProductService(id, product)
      res.send({ status: 'success', result })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async deleteProductController (req, res, next) {
    try {
      const id = req.params.pid
      if (!id){
        CustomError.createError({
          name: 'id empty',
          cause: 'type of ID expected, yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      if (!mongoose.isValidObjectId(id)) {
        CustomError.createError({
          name: 'cannot search product with that id',
          cause: 'type of ID expected, yuyoID',
          message: 'it must be a yuyoId',
          code: ErrorEnum.PARAM_ERROR
        })
      }
      const productoBuscado= await this.productService.getProductsByIdService(id);
      if (productoBuscado == undefined){
        CustomError.createError({
          name: 'cannot find product with that id',
          cause: 'type of ID expected, yuyoID',
          message: 'try with another id',
          code: ErrorEnum.DATABASE_ERROR
        })
      }
      if (!(req.user.role === "admin" || productoBuscado.owner === req.user.email) ) {
         CustomError.createError({
          name: 'you dont have acces',
          cause: 'You cant delete other owners products',
          message: 'try with your own products',
          code: ErrorEnum.ROLE_ERROR
        }) 
      } 
      if(productoBuscado.owner === "premium"){
        let html = `<h1>Correo de Aviso de Eliminación de Producto - ${productoBuscado.owner}</h1>`
        html = html.concat(
          `<div><h1>Se le informa que se ha eliminado el producto, que usted ha creado.
          Producto: ${productoBuscado.title} - Id: ${productoBuscado._id} </div>`);
        let asunto="Correo de Aviso de eliminación de Producto";
        this.mail.send(productoBuscado.owner,asunto,html);
    }
      const result = await this.productService.deleteProductService(id)
      res.send({ status: 'success', result })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }

  async generateProductsController (req, res, next) {
    try {
      const result = await this.productService.generateProductsService(req, res)
      req.logger.info('100 new products added')
      res.send({ status: 'success', result })
    } catch (error) {
      req.logger.error(error)
      next(error)
    }
  }
}
