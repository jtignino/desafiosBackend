import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

import { login, register, forgotPassword, resetPassword, getUsers, getUserById } from '../controllers/users.controller.js';

export default class UsersRouter extends Router {
    init() {
        this.post('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', login);
        this.post('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', register);
        this.post('/forgotPassword', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', forgotPassword);
        this.post('/resetPassword', ['PUBLIC'], passportStrategiesEnum.JWT, 'resetAccessToken', resetPassword);
        // this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, 'coderCookieToken', getUsers);
        // this.get('/:id', ['ADMIN'], passportStrategiesEnum.NOTHING, 'coderCookieToken', getUserById);

        this.get('/:id', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', getUserById);
        this.get('/', ['PUBLIC'], passportStrategiesEnum.NOTHING, 'coderCookieToken', getUsers);
        
        // this.delete('/', ['ADMIN'], passportStrategiesEnum.JWT, deleteUsers);
    }
}