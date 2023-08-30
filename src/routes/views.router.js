import { Router } from 'express';
import passport from 'passport';
import ViewsController from '../controllers/views.controller.js';
import MessagesManager from '../daos/mongodb/managers/MessagesManager.class.js';
import CartManager from '../daos/mongodb/managers/CartManager.class.js';
import ProductController from '../controllers/product.controller.js';

let viewsController = new ViewsController()
let productController = new ProductController()
let messagesManager = new MessagesManager();

const router = Router();

router.get('/', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  res.render('profile', {
    user: req.user
  });
})

router.get('/products', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    let user = req.user
    let products = await viewsController.productsViewController(req, res);
    res.render('home', {
      title: "productos",
      products: products,
      user: user,
    })
  } catch (error) {
    return next(error);
  }
})

router.get('/products/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    let user = req.user
    let product = await viewsController.productViewController(req, res)
    res.render('product', {
      title: "producto",
      product: product,
      user: user
    })
  } catch (error) {
    return next(error);
  }
})

router.get('/carts/:id', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    let user = req.user
    const cart = await viewsController.cartViewController(req, res)
    res.render('cart', {
      title: "cart",
      cart: cart,
      user: user
    })
  } catch (error) {
    return next(error);
  }
})

router.get('/allpurchases', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
  try {
    let user = req.user
    const ticket = await viewsController.allPurchasesViewController(req, res)
    res.render('ticket', {
      title: "ticket",
      ticket: ticket,
      user: user
    })
  } catch (error) {
    return next(error);
  }
})


router.get('/messages', async (req, res, next) => {
  try {
    const messages = await messagesManager.getMessages();
    res.render('chat', { messages: messages, style: "style.css", title: "Mensajes" })
  } catch (error) {
    return next(error);
  }
});


router.get('/realtimeproducts', async (req, res, next) => {
  try {
    const products = await productController.getProductsController(req.query.limit);
    res.render('realTimeProducts', { products: products, style: "style.css", title: "Productos" })
  } catch (error) {
    return next(error);
  }
});


router.get('/register', (req, res, next) => {
  try {
    res.render('register');
  } catch (error) {
    return next(error);
  }
})

router.get('/login', (req, res, next) => {
  try {
    res.render('login');
  } catch (error) {
    return next(error);
  }
})

router.get('/', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  try {
    res.render('profile', { user: req.user });
  } catch (error) {
    return next(error);
  }
})

router.get('/resetPassword', (req, res, next) => {
  try {
    res.render('resetPassword');
  } catch (error) {
    return next(error);
  }
})

export default router;

