import { Router } from 'express'
import passport from 'passport'

import CartController from '../controllers/cart.controller.js'
import { verificarPerteneciaCarrito } from './middlewares/carts.Middleware.js'

const router = Router()
const cartsController = new CartController()

router.post('/', async (req, res) => {
  await cartsController.createCartController(req, res)
})

router.get('/:cid', 
  passport.authenticate('jwt', { session: false }),
  verificarPerteneciaCarrito,
   async (req, res, next) => {
    await cartsController.getCartByIdContoller(req, res,next)
  })

router.get('/c/:cid', async (req, res,next) => {
  await cartsController.getAllProductsFromCartController(req, res,next)
})

router.get('/', async (req, res,next) => {
  await cartsController.getAllCartsController(req, res, next)
})

router.post(
  '/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  verificarPerteneciaCarrito,
  async (req, res, next) => {
    await cartsController.addProductToCartController(req, res, next)
  }
)

router.delete('/:cid/product/:pid',
  passport.authenticate('jwt', { session: false }),
  verificarPerteneciaCarrito,
  async (req, res,next) => {
    await cartsController.deleteProductFromCartController(req, res, next)
  })

router.delete('/:cid',
  passport.authenticate('jwt', { session: false }),
  verificarPerteneciaCarrito, async (req, res,next) => {
    await cartsController.cleanCartController(req,res,next)
  })

router.post('/purchase/:cid',
  passport.authenticate('jwt', { session: false }),
  verificarPerteneciaCarrito,
  async (req, res, next) => {
  await cartsController.procesPurchaseController(req, res, next)
  }
)

export default router
