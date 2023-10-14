import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { current } from '../controllers/sessions.controller.js';

export default class SessionsRouter extends Router {
    init() {
        this.get('/current', ['PUBLIC'], passportStrategiesEnum.JWT, current)

    }
}
