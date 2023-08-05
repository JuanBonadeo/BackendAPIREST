import { Router } from 'express';
import passport from 'passport';

import ProductManager from '../daos/mongodb/managers/ProductManager.class.js';
import MessagesManager from '../daos/mongodb/managers/MessagesManager.class.js';
import CartManager from '../daos/mongodb/managers/CartManager.class.js';
import viewsControllers from '../controllers/views.controllers.js';

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
  let user = req.user
    let page = req.query.page;
    let limit=req.query.limit;
    let sort=req.query.sort;
    let filtro=req.query.filtro;
    let filtroVal=req.query.filtroVal;
    let products= await productManager.getProducts(limit,page,sort,filtro,filtroVal);
    products.prevLink = products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}&limit=${products.limit}`:'';
    products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}&limit=${products.limit}`:'';

    res.render('home', {
        title: "productos",
        products: products,
        user: user,
      }) 
  
  
})

router.get('/products/:id', passport.authenticate('jwt', {session: false}), async (req,res)=>{ 
  let user = req.user
  const id = req.params.id;
  let product = await productManager.getProductById(id)
  
  res.render('product',{
    title:"producto",
    product: product,
    user:user
  })
})

router.get('/carts/:id',passport.authenticate('jwt', {session: false}),async (req,res)=>{ 
  let user = req.user
  const id = req.params.id;
try{
  const cart = await cartManager.getAllProductsFromCart(id);
  res.render('cart',{
    title:"cart",
    cart: cart,
    user:user
  }) 
}catch (error) {
  console.error(error);
  res.status(400).send(error.message); // Envía el mensaje de error al cliente de Postman
}

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