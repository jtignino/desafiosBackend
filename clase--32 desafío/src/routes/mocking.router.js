import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { generateProduct } from '../utils.js';

export default class MockingRouter extends Router {
    init() {
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, async (req, res) => {
            let users = [];

            for (let i = 0; i < 100; i++) {
                users.push(generateProduct());
            }

            res.send({
                status: 'ok',
                count: users.length,
                data: users
            })
        });
    }
}