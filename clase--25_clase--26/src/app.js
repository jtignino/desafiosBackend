import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import viewsRouter from './routes/views.router.js';
import {__dirname} from './utils.js';
// import sessionsRouter from './routes/sessions.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';
import UsersRouter from './routes/users.router.js';
import ProductsRouter from './routes/products.router.js';
import CartsRouter from './routes/carts.router.js';
import config from './config/constants.config.js';
import './dao/dbManagers/dbConfig.js';

const usersRouter = new UsersRouter();
const productsRouter = new ProductsRouter();
const cartsRouter = new CartsRouter();

const app = express();

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`));

// app.use(session({
//     store: MongoStore.create({
//         client: mongoose.connection.getClient(),
//         ttl: 3600
//     }),
//     secret: 'Coder39760',
//     resave: true,
//     saveUninitialized: true
// }));

initializePassport();
app.use(passport.initialize());
// app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/users', usersRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());

app.use('/', viewsRouter);
// app.use('/api/sessions', sessionsRouter);



const server = app.listen(config.port, () => console.log("Server running on port 8080"));
