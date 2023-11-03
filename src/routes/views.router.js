import { Router } from 'express'
import passport from 'passport'
import ViewsController from '../controllers/views.controller.js'
import MessagesManager from '../daos/mongodb/managers/MessagesManager.class.js'
import ProductController from '../controllers/product.controller.js'

const viewsController = new ViewsController()
const productController = new ProductController()
const messagesManager = new MessagesManager()

const router = Router()

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  let premium = req.user.role
  if (premium !== 'premium') { premium = '' }
  res.render('profile', {
    user: req.user,
    premium
  })
})

router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const user = req.user
  const products = await viewsController.productsViewController(req, res, next)
  res.render('home', {
    title: 'productos',
    products,
    user,
  })
})

router.get('/products/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const user = req.user
  const product = await productController.getProductsByIdController(req, res, next)
  res.render('product', {
    title: 'producto',
    style: 'product.css',
    product,
    user
    
  })
})

router.get('/carts/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const user = req.user
  const cart = await viewsController.cartViewController(req, res, next)
  res.render('cart', {
    title: 'cart',
    cart,
    user
  })
})

router.get('/allpurchases', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  const user = req.user
  const ticket = await viewsController.allPurchasesViewController(req, res, next)
  res.render('ticket', {
    title: 'ticket',
    ticket,
    user
  })
})

router.get('/messages', async (req, res) => {
  const messages = await messagesManager.getMessages()
  res.render('chat', { messages, style: 'style.css', title: 'Mensajes' })
})

router.get('/realtimeproducts', async (req, res) => {
  const products = await productController.getProductsController(req.query.limit)
  res.render('realTimeProducts', { products, style: 'style.css', title: 'Productos' })
})

router.get('/register', (req, res) => {
  res.render('register', { title: 'register', style: 'login.css' })
})

router.get('/login', (req, res) => {
  res.render('login', { title: 'login' , style: 'login.css'})
})


router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.render('profile', { user: req.user })
})

router.get('/resetPassword', passport.authenticate('jwtRequestPassword', { session: false, failureRedirect: 'requestResetPassword' }), (req, res) => {
  res.render('resetPassword')
})

router.get('/requestResetPassword', (req, res) => {
  res.render('requestResetPassword')
})

export default router
