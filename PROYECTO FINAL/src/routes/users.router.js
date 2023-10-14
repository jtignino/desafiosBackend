import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { login, register, getUsers, getUserById } from '../controllers/users.controller.js';

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, login);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, register);
        this.get('/', ['ADMIN'], passportStrategiesEnum.NOTHING, getUsers);
        this.get('/:id', ['ADMIN'], passportStrategiesEnum.NOTHING, getUserById);

        // this.delete('/', ['ADMIN'], passportStrategiesEnum.JWT, deleteUsers);
        // this.delete('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, deleteUsers);
    }
}