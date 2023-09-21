import { fileURLToPath } from "url";
import { dirname } from "path";
import config from "../config/constants.config.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import winston from 'winston';

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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.nodemailerUser,
        pass: config.nodemailerPass
    }
})

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warning: 'yellow',
        info: 'green',
        http: 'green',
        debug: 'blue'
    }
}

let logger;

if (config.nodeEnv === 'production') {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info'
            }),
            new winston.transports.File({
                filename: 'logs/errors.log',
                level: 'error'
            })
        ]
    });
} else {
    logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug'
            })
        ]
    });
}


export {
    __dirname,
    createHash,
    isValidPassword,
    generateToken,
    logger,
    transporter
}