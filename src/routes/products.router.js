import { Router } from 'express'
import ProductController from '../controllers/product.controller.js'
import passport from 'passport'
import { rolesAdminPremiumMiddlewares } from './middlewares/roles.Middleware.js'


const productControllers = new ProductController()

const router = Router()

router.get('/', async (req, res, next) => {
  await productControllers.getProductsController(req, res,next)

})

router.get('/:id', async (req, res,next) => {
  await productControllers.getProductsByIdController(req, res,next)
})

router.post('/',
  passport.authenticate('jwt', { session: false }),
  rolesAdminPremiumMiddlewares,
  async (req, res, next) => {
    await productControllers.addProductController(req, res, next)
  }
)

router.put('/:pid',
  passport.authenticate('jwt', { session: false }),
  rolesAdminPremiumMiddlewares,
  async (req, res, next) => {
    await productControllers.updateProductController(req, res, next)
  }
)

router.delete('/:pid',
  passport.authenticate('jwt', { session: false }),
  rolesAdminPremiumMiddlewares,
  async (req, res,next) => {
    await productControllers.deleteProductController(req, res, next)
  }
)

router.post('/mockingproducts', async (req, res) => {
  await productControllers.generateProductsController()
})

export default router
