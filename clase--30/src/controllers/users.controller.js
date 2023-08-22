import {
    getUser as getUserService,
    saveUser as saveUserService,
    getUsers as getUsersService,
    getUserById as getUserByIdService
} from '../services/users.services.js';

import { createHash, isValidPassword, generateToken } from '../utils.js';

const getUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await getUserService(email);

        if (!user) return res.sendClientError('incorrect credentials');

        const comparePassword = isValidPassword(user, password);

        if (!comparePassword) {
            return res.sendClientError('incorrect credentials');
        }

        delete user.password;

        const accessToken = generateToken(user);
        res.sendSuccess({ accessToken });
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const saveUser = async (req, res) => {
    try {
        const { first_name, last_name, role, email, password } = req.body;

        if (!first_name || !last_name || !role || !email || !password)
            return res.sendClientError('incomplete values')

        const exists = await getUserService(email);

        if (exists)
            return res.sendClientError('user already exists')

        const hashedPassword = createHash(password);

        const newUser = {
            ...req.body
        };

        newUser.password = hashedPassword;

        const result = await saveUserService(newUser);

        res.sendSuccess(result)
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getUsers = async (req, res) => {
    try {
        const users = await getUsersService();
        res.sendSuccess(users);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await getUserByIdService(id);

        if (!user) return res.sendClientError('User not found.');

        res.sendSuccess(user);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

export {
    getUser,
    saveUser,
    getUsers,
    getUserById
}