import express from 'express';
import handlebars from 'express-handlebars';
import cors from 'cors';
import viewsRouter from './routes/views.router.js';
import { __dirname } from './utils.js';
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

app.use(cors());

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/users', usersRouter.getRouter());
app.use('/api/products', productsRouter.getRouter());
app.use('/api/carts', cartsRouter.getRouter());

app.use('/', viewsRouter);

const server = app.listen(config.port, () => console.log("Server running on port 8080"));
