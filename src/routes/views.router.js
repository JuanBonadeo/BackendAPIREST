import { Router } from 'express';
import passport from 'passport';
import ViewsController from '../controllers/views.controller.js';
import ProductManager from '../daos/mongodb/managers/ProductManager.class.js';
import MessagesManager from '../daos/mongodb/managers/MessagesManager.class.js';
import CartManager from '../daos/mongodb/managers/CartManager.class.js';

let viewsController = new ViewsController()
let productManager = new ProductManager()
let messagesManager = new MessagesManager();
let cartManager = new CartManager()

const router = Router();

router.get('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  res.render('profile', {
      user: req.user
  }); 
}) 

router.get('/products', passport.authenticate('jwt', {session: false}), async (req,res)=>{
    let user=req.user
    let products= await viewsController.productsViewController(req,res);
    res.render('home', {
        title: "productos",
        products: products,
        user: user,
      }) 
})

router.get('/products/:id', passport.authenticate('jwt', {session: false}), async (req,res)=>{ 
  let user = req.user
  let product = await viewsController.productViewController(req,res)
  res.render('product',{
    title:"producto",
    product: product,
    user:user
  })
})

router.get('/carts/:id',passport.authenticate('jwt', {session: false}),async (req,res)=>{ 
  let user = req.user
  const cart = await viewsController.cartViewController(req,res)
  res.render('cart',{
    title:"cart",
    cart: cart,
    user:user
  }) 


})


router.get('/messages', async (req, res) => {
  const messages= await messagesManager.getMessages();
    res.render('chat', { messages: messages, style: "style.css", title: "Mensajes" })

});


router.get('/realtimeproducts', async (req, res) => {
  const products= await productManager.getProducts(req.query.limit);
    res.render('realTimeProducts', { products: products, style: "style.css", title: "Productos" })

});


router.get('/register', (req, res) => {
  res.render('register');
})

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/', passport.authenticate('jwt', {session: false}),(req, res) => {
  res.render('profile', {
      user: req.user
  });
})

router.get('/resetPassword',(req,res)=>{
  res.render('resetPassword');
})

export default router;