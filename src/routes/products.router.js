import { Router } from 'express'
import ProductController from '../controllers/product.controller.js'
import passport from 'passport'
import { rolesAdminPremiumMiddlewares } from './middlewares/roles.Middleware.js'
import ProductManager from '../daos/mongodb/managers/ProductManager.class.js'

const productControllers = new ProductController()
const pm = new ProductManager()

const router = Router()

router.get('/', async (req, res, next) => {
  const products = await productControllers.getProductsController(req, res,next)
  res.send({ products })
})

router.get('/:id', async (req, res,next) => {
  const product = await productControllers.getProductsByIdController(req, res,next)
  res.send({ product })
})

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  rolesAdminPremiumMiddlewares,
  async (req, res, next) => {
    const product = await productControllers.addProductController(req, res, next)
    res.send({ status: 'success', product })
  }
)

router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  rolesAdminPremiumMiddlewares,
  async (req, res, next) => {
    const product = await productControllers.updateProductController(req, res, next)
    res.send({ status: 'success', product })
  }
)

router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  rolesAdminPremiumMiddlewares,
  async (req, res,next) => {
    const result = await productControllers.deleteProductController(req, res, next)
    //res.send({ status: 'success', result })
  }
)

router.post('/mockingproducts', async (req, res) => {
  const result = await productControllers.generateProductsController()
  res.send({ payload: result })
})



export default router
