import UsersRepository from '../repositories/users.repository.js';
import { IncorrectLoginCredentials, ResetPasswordError, UserAlreadyExists, UserNotFound } from '../utils/custom-exception.js';
import { loginNotification, forgotPasswordEmail, resetPasswordEmail } from '../utils/custom-html.js';
import { createHash, generateToken, isValidPassword } from '../utils/utils.js';
import { sendEmail } from './mail.js';

import { Users } from '../dao/factory.js';

const users = new Users();
const userRepository = new UsersRepository(users);

const getUserByEmail = async (email) => {
    const user = await userRepository.getUserByEmail(email);

    if (!user) throw new UserNotFound('User not found.');

    return user;
}

const login = async (user, password) => {
    const comparePassword = isValidPassword(user, password);

    if (!comparePassword) 
        throw new IncorrectLoginCredentials('Incorrect credentials.');

    const accessToken = generateToken(user, '1h');

    const email = {
        to: user.email,
        subject: 'Intento de login',
        html: loginNotification
    }

    await sendEmail(email);

    return accessToken;
}

const forgotPassword = async (userEmail) => {
    const accessToken = generateToken({ email: userEmail }, '10m');

    const email = {
        to: userEmail,
        subject: 'Restablecer contraseña',
        html: forgotPasswordEmail(userEmail)
    }

    await sendEmail(email);

    return accessToken;
}

const resetPassword = async (user, password) => {
    const comparePassword = isValidPassword(user, password);
    
    if (comparePassword) 
        throw new ResetPasswordError('The new password is the same as the previous one.');

    const hashedPassword = createHash(password);

    const result = await userRepository.updateUser(user._id, { password: hashedPassword });

    const emailNotification = {
        to: user.email,
        subject: 'Se restableció su contraseña',
        html: resetPasswordEmail
    }

    await sendEmail(emailNotification);
    
    return result;
}

const getUserRegister = async (email) => {
    const user = await userRepository.getUserByEmail(email);

    if (user) throw new UserAlreadyExists('User already exists.');
}

const getUsers = async () => {
    const users = await userRepository.getUsers();
    return users;
}

const getUserById = async (id) => {
    const user = await userRepository.getUserById(id);

    if (!user) throw new UserNotFound('User not found.');

    return user;
}

const register = async (user) => {
    const hashedPassword = createHash(user.password);

    user.password = hashedPassword;

    const result = await userRepository.saveUser(user);
 
    return result;
}

export {
    getUserByEmail,
    login,
    forgotPassword,
    resetPassword,
    getUserRegister,
    getUsers,
    getUserById,
    register
}