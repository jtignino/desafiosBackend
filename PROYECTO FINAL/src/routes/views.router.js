import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { login, logout, products, register } from '../controllers/views.controller.js';

export default class ViewsRouter extends Router {
    init() {
        this.get('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, register)
        this.get('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, login)
        this.get('/logout', ['PUBLIC'], passportStrategiesEnum.NOTHING, logout)
        this.get('/products', ['PUBLIC'], passportStrategiesEnum.JWT, products)
    }
}

