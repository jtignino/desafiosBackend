import {
    getUser as getUserService,
    saveUser as saveUserService,
    getUsers as getUsersService,
    getUserById as getUserByIdService
} from '../services/users.services.js';

import { createHash, isValidPassword, generateToken } from '../utils.js';
import CustomError from '../middlewares/errors/CustomError.js';
import { generateUserErrorInfo } from '../middlewares/errors/info.js';
import EErrors from '../middlewares/errors/enums.js';

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
        console.log(EErrors.INVALID_TYPE_ERROR)
    
        const { first_name, last_name, role, email, password } = req.body;

        if (!first_name || !last_name || !role || !email || !password) {
            throw CustomError.createError({
                name: 'UserError',
                cause: generateUserErrorInfo({
                    first_name,
                    last_name,
                    role,
                    email,
                    password
                }),
                message: 'Error trying to create user.',
                code: EErrors.INVALID_TYPE_ERROR
            });
        }

        const exists = await getUserService(email);

        if (exists)
            return res.sendClientError('User already exists.')

        const hashedPassword = createHash(password);

        const newUser = {
            ...req.body
        };

        newUser.password = hashedPassword;

        const result = await saveUserService(newUser);

        res.sendSuccess(result)
    
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