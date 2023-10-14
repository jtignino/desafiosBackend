import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { saveProduct, getAllProducts, getProductById, updateProduct, deleteProduct } from '../controllers/products.controller.js';

export default class ProductsRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, saveProduct)
        // this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, getAllProducts);
        // this.get('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, getProductById);
        this.put('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, updateProduct);
        this.delete('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, deleteProduct);

        // this.post('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, saveProduct)
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, getAllProducts);
        this.get('/:pid', ['PUBLIC'], passportStrategiesEnum.NOTHING, getProductById);
        // this.put('/:pid', ['PUBLIC'], passportStrategiesEnum.NOTHING, updateProduct);
        // this.delete('/:pid', ['PUBLIC'], passportStrategiesEnum.NOTHING, deleteProduct);
    }
}
