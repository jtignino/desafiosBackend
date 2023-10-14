import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { create, add, getCart, getAll, purchase, update, updateProductInCart, deleteProduct, emptyCart } from '../controllers/carts.controller.js';

export default class CartsRouter extends Router {
    init() {
        this.post('/', ['USER'], passportStrategiesEnum.JWT, create)
        this.post('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, add)
        this.get('/:cid', ['USER'], passportStrategiesEnum.JWT, getCart);
        this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, getAll);
        this.get('/:cid/purchase', ['USER'], passportStrategiesEnum.JWT, purchase);
        this.put('/:cid', ['USER'], passportStrategiesEnum.JWT, update);
        this.put('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, updateProductInCart);
        this.delete('/:cid/product/:pid', ['USER'], passportStrategiesEnum.JWT, deleteProduct);
        this.delete('/:cid', ['USER'], passportStrategiesEnum.JWT, emptyCart);
        
        // this.post('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, create)
        // this.post('/:cid/product/:pid', ['PUBLIC'], passportStrategiesEnum.NOTHING, add)
        // this.get('/:cid', ['PUBLIC'], passportStrategiesEnum.NOTHING, getCart);
        // this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, getAll);
        // this.get('/:cid/purchase', ['PUBLIC'], passportStrategiesEnum.NOTHING, purchase);
        // this.put('/:cid', ['PUBLIC'], passportStrategiesEnum.NOTHING, update);
        // this.put('/:cid/product/:pid', ['PUBLIC'], passportStrategiesEnum.NOTHING, updateProductInCart);
        // this.delete('/:cid/product/:pid', ['PUBLIC'], passportStrategiesEnum.NOTHING, deleteProduct);
        // this.delete('/:cid', ['PUBLIC'], passportStrategiesEnum.NOTHING, emptyCart);
    }
}
