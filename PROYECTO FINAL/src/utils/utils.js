import { fileURLToPath } from "url";
import { dirname, join } from "path";
import config from "../config/constants.config.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import winston from 'winston';

const __filename = fileURLToPath(import.meta.url);
const path = dirname(__filename);
const __dirname = join(path, "..");

const createHash = password =>
    bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) =>
    bcrypt.compareSync(password, user.password);

const generateToken = (user, expiryTime) => {
    if (user.password) delete user.password;

    const token = jwt.sign({ user }, config.privateKey, { expiresIn: expiryTime });
    console.log(token)
    
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