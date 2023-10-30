import express from 'express';
import handlebars from 'express-handlebars';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import cors from 'cors';
import twilio from 'twilio';

import UsersRouter from './routes/users.router.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import ViewsRouter from './routes/views.router.js';
import SessionsRouter from './routes/sessions.router.js';

import { __dirname, logger } from './utils/utils.js';
import initializePassport from './config/passport.config.js';
import config from './config/constants.config.js';

// import MongoSingleton from './dao/dbManagers/dbConfig.js';

// const connectBDD = MongoSingleton.getInstance();

const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();
const viewsRouter = new ViewsRouter();
const sessionsRouter = new SessionsRouter();

const app = express();

app.use(cors());

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));
app.use(cookieParser(config.cookieSecret));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());

const client = twilio(
    config.twilioAccountSID,
    config.twilioAuthToken,
    config.twilioPhoneNumber
);

app.get('/sms', async (req, res) => {
    await client.messages.create({
        from: config.twilioPhoneNumber,
        to: config.smsNumberTo,
        body: 'Este es un msj de prueba de SMS.'
    });

    res.send('SMS enviado.')
});

app.post('/whatsapp', async (req, res) => {
    const { name, product } = req.body;

    await client.messages.create({
        body: `Hola ${name}, gracias por comprar el producto ${product}!`,
        from: 'whatsapp:+14155238886',
        to: `whatsapp:${config.smsNumberTo}`
    });

    res.send('Whatsapp enviado.')
});


app.get('/loggerTest', (req, res) => {
    logger.fatal('Prueba fatal');
    logger.error('Prueba error');
    logger.warning('Prueba warn');
    logger.info('Prueba info');
    logger.http('Prueba http');
    logger.debug('Prueba debug');
});

app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/users', usersRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());
app.use('/api/sessions', sessionsRouter.getRouter());
app.use('/', viewsRouter.getRouter());

const server = app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
