import ViewsService from "../services/views.service.js";


export default class ViewsController {
    constructor() {
        this.viewsService = new ViewsService()
    }

    async productsViewController(req, res, next) {
        try {
            let page = req.query.page || 1;
            let limit = req.query.limit || 10;
            let sort = req.query.sort;
            let filtro = req.query.filtro;
            let filtroVal = req.query.filtroVal
            const products = await this.viewsService.productsViewService(limit, page, sort, filtro, filtroVal)
            products.prevLink = products.hasPrevPage ? `http://localhost:8080/products?page=${products.prevPage}&limit=${products.limit}` : '';
            products.nextLink = products.hasNextPage ? `http://localhost:8080/products?page=${products.nextPage}&limit=${products.limit}` : '';
            return products
        } catch (error) {
            req.logger.error(error);
            return next(error);
        }
    }
    async productViewController(req, res, next) {
        try {
            let id = req.params.id;
        const product = await this.viewsService.productViewService(id)
        return product
        } catch (error) {
            req.logger.error(error);
            return next(error);
        }
    }
    async cartViewController(req, res, next) {
        try {
            const id = req.params.id;
        const cart = await this.viewsService.cartViewService(id)
        return cart
        } catch (error) {
            req.logger.error(error);
            return next(error);
        }
    }
    async allPurchasesViewController(req, res, next) {
        try {
           let user = req.user.email
        const ticket = await this.viewsService.allPurchasesService(user)
        return ticket
        } catch (error) {
            req.logger.error(error);
            return next(error);
        }
    }

} 

