import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "./config/constants.config.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { faker } from "@faker-js/faker/locale/es";

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

const generateProduct = () => {
    return {
        _id: faker.database.mongodbObjectId(),
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code: faker.string.alphanumeric(10),
        price: faker.commerce.price({ min: 50, max: 5000 }),
        stock: faker.number.int({ min: 1, max: 100 }),
        category: faker.commerce.department(),
        status: faker.datatype.boolean()
    }
};


export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken,
    generateProduct
}