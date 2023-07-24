import { Router } from 'express';
import passport from 'passport';

import ProductManager from '../daos/mongodb/ProductManager.class.js';
import MessagesManager from '../daos/mongodb/MessagesManager.class.js';
import CartManager from '../daos/mongodb/CartManager.class.js';

let productManager = new ProductManager()
let messagesManager = new MessagesManager();
let cartManager = new CartManager()

const router = Router();

router.get('/', async (req,res)=>{
  const productos= await productManager.getProducts(req.query.limit);
  res.render('home', {
    products: productos,
    style:"style.css"
  })
})

router.get('/products',async (req,res)=>{
  let page = req.query.page;
  let limit=req.query.limit;
  let sort=req.query.sort;
  let filtro=req.query.filtro;
  let filtroVal=req.query.filtroVal;
  let result= await productManager.getProducts(limit,page,sort,filtro,filtroVal);
  
  result.prevLink = result.hasPrevPage?`http://localhost:8080/products?page=${result.prevPage}&limit=${result.limit}`:'';
  result.nextLink = result.hasNextPage?`http://localhost:8080/products?page=${result.nextPage}&limit=${result.limit}`:'';
  result.isValid= !(page<=0||page>result.totalPages)
  res.render('home',result) 
})

router.get('/products/:id',async (req,res)=>{ 
  const id = req.params.id;
  let result = await productManager.getProductById(id)
  res.render('product',result) 
})

router.get('/carts/:id',async (req,res)=>{ 
  const id = req.params.id;
try{
  const cart = await cartManager.getAllProductsFromCart(id);
  res.render('cart',cart) 
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