import express from 'express';
import handlebars from 'express-handlebars';
import cors from 'cors';

import twilio from 'twilio';
// import viewsRouter from './routes/views.router.js';
import { __dirname, logger } from './utils/utils.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import UsersRouter from './routes/users.router.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import config from './config/constants.config.js';
// import MongoSingleton from './dao/dbManagers/dbConfig.js';

// const connectBDD = MongoSingleton.getInstance();

const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();

const app = express();

app.use(cors());

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());

// app.get('/mail', async (req, res) => {
//     await transporter.sendMail({
//         from: 'JT Test',
//         to: 'jonathan.jat@hotmail.com',
//         subject: 'Correo de prueba de mailing',
//         html: '<div><h1>Este es un correo de prueba de mailing de la clase 30.</h1></div>'
//     });

//     res.send('Correo enviado');    
// });

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

// app.use('/', viewsRouter);

const server = app.listen(config.port, () => console.log(`Server running on port ${config.port}`));
