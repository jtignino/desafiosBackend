import * as usersService from '../services/users.services.js';
import * as cartsService from '../services/carts.services.js';
import { UserNotFound, IncorrectLoginCredentials, UserAlreadyExists } from '../utils/custom-exception.js';


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await usersService.getUserByEmail(email);

        const accessToken = await usersService.login(user, password);
        
        res.cookie('coderCookieToken', accessToken, { maxAge: 60 * 60 * 1000, httpOnly: true, sameSite: 'none', secure: true })
        
        // if (user.role === 'admin') {
        //     return res.sendSuccess('Log in success ADMIN.');
        // } else if (req && !req.signedCookies['cartId']) {
        //     console.log('Log en user.controller signedCookies')
        //     console.log(user.cart.toString())
        //     res.cookie('cartId', user.cart.toString(), { sameSite: 'none', secure: true })
        // }

        res.sendSuccess('Log in success.');

    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);

        if (error instanceof IncorrectLoginCredentials) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const register = async (req, res) => {
    try {
        const { first_name, last_name, role, email, password } = req.body;

        if (!first_name || !last_name || !email || !password)
            return res.sendClientError('Incomplete values.');

        await usersService.getUserRegister(email);

        const cart = await cartsService.create();

        const register = await usersService.register({ ...req.body, cart });

        res.sendSuccess(register);

    } catch (error) {
        if (error instanceof UserAlreadyExists)
            return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await usersService.getUsers();

        res.sendSuccess(users);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await usersService.getUserById(id);

        res.sendSuccess(user);
    } catch (error) {
        if (error instanceof UserNotFound) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}


export {
    login,
    register,
    getUsers,
    getUserById
}