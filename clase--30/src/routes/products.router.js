import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { save, getAll, getById, update, deleteProduct } from '../controllers/products.controller.js';

export default class ProductsRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, save)
        this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, getAll);
        this.get('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, getById);
        this.put('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, update);
        this.delete('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, deleteProduct);
    }
}
