import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import productRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';
import sessionsRouter from './routes/sessions.router.js';
import initializePassport from './config/passport.config.js';
import passport from 'passport';

const app = express();

// Conexión a la DB utilizando mongoose:
try {
    await mongoose.connect('mongodb+srv://jonathanjat:VpF0lkWIlIVJGPpu@cluster39760jt.h28fnid.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB connected.');
} catch (error) {
    console.log(error);
}

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`));

app.use(session({
    store: MongoStore.create({
        client: mongoose.connection.getClient(),
        ttl: 3600
    }),
    secret: 'Coder39760',
    resave: true,
    saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

const server = app.listen(8080, () => console.log("Server running on port 8080"));



// Dejo comentado codigo que no voy a utilizar por el momento.
/*
const io = new Server(server);

io.on('connection', socket => {
    console.log(`Cliente ${socket.id} conectado.`);
});

app.set('socketio', io);
*/