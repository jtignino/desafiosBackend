import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { getUser, saveUser, getUsers, getUserById } from '../controllers/users.controller.js';

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, getUser);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, saveUser);
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, getUsers);
        this.get('/:id', ['PUBLIC'], passportStrategiesEnum.NOTHING, getUserById);
    }
}