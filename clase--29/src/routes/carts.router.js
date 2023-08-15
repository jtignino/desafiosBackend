import Router from './router.js';
import Carts from '../dao/dbManagers/cart.manager.js';
import Products from '../dao/dbManagers/product.manager.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { create, add, getCart, getAll, purchase, update, updateProductInCart, deleteProduct, emptyCart } from '../controllers/carts.controller.js';

const cartManager = new Carts();
const productManager = new Products();

export default class CartsRouter extends Router {
    init() {
        this.post('/', ['USER'], passportStrategiesEnum.JWT, create)
        this.post('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, add)
        this.get('/:cid', ['USER'], passportStrategiesEnum.JWT, getCart);
        this.get('/', ['USER'], passportStrategiesEnum.JWT, getAll);
        this.get('/:cid/purchase', ['USER'], passportStrategiesEnum.JWT, purchase);
        this.put('/:cid', ['USER'], passportStrategiesEnum.JWT, update);
        this.put('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, updateProductInCart);
        this.delete('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, deleteProduct);
        this.delete('/:cid', ['USER'], passportStrategiesEnum.JWT, emptyCart);
    }
}
