const { Router } = require ('express');
const ProductController = require ('./controllers/ProductController');
const routes = Router();

routes.post('/product', ProductController.store);
routes.get('/product', ProductController.index);
routes.delete('/product/:id', ProductController.delete);

module.exports = routes;