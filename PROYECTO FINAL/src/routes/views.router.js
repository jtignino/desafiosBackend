import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { login, logout, products, register, forgotPassword, resetPassword } from '../controllers/views.controller.js';

export default class ViewsRouter extends Router {
    init() {
        this.get('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', register)
        this.get('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', login)
        this.get('/logout', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', logout)
        this.get('/forgotPassword', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', forgotPassword)
        this.get('/resetPassword', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', resetPassword)
        this.get('/products', ['PUBLIC'], passportStrategiesEnum.JWT, 'coderCookieToken', products)
    }
}

