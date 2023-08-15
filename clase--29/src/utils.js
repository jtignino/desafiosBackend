import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "./config/constants.config.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.privateKey, { expiresIn: '24h' });
    return token;
};

export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken
}