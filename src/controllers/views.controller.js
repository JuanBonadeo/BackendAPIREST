import ViewsService from "../services/views.service.js";


export default class ViewsController {
    constructor(){
        this.viewsService = new ViewsService()
    }

    async productsViewController(req, res){ 
        let page = req.query.page;
        let limit = req.query.limit;
        let sort = req.query.sort;
        let filtro = req.query.filtro;
        let filtroVal = req.query.filtroVal
        const products = await this.viewsService.productsViewService(limit,page,sort,filtro,filtroVal)
        products.prevLink = products.hasPrevPage?`http://localhost:8080/products?page=${products.prevPage}&limit=${products.limit}`:'';
        products.nextLink = products.hasNextPage?`http://localhost:8080/products?page=${products.nextPage}&limit=${products.limit}`:'';
        return products
    }
    async productViewController(req,res){
        let id = req.params.id;
        const product = await this.viewsService.productViewService(id)
        return product
    }
    async cartViewController(req,res){
        const id = req.params.id;
        const cart= await this.viewsService.cartViewControllerService(id)
        return cart
    }
} 