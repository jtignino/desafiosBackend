import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { purchase } from '../controllers/tickets.controller.js';

export default class TicketsRouter extends Router {
    init() {
        this.post('/purchase', ['USER'], passportStrategiesEnum.JWT, purchase)
    }
}