import Router from './router.js';
import Users from '../dao/dbManagers/user.manager.js';
import { passportStrategiesEnum } from '../config/enums.config.js';
import { isValidPassword, generateToken, createHash } from '../utils.js';

import { getUser, saveUser } from '../controllers/users.controller.js';

const usersManager = new Users();

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, getUser);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, saveUser);
    }
}