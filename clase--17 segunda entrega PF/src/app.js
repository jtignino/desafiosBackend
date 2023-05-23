import express from 'express';
import productRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import __dirname from './utils.js';

import mongoose from 'mongoose';


const app = express();

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);

// Conexión a la DB utilizando mongoose:
try {
    await mongoose.connect('mongodb+srv://jonathanjat:VpF0lkWIlIVJGPpu@cluster39760jt.h28fnid.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB connected.');
} catch (error) {
    console.log(error);
}

const server = app.listen(8080, () => console.log("Server running on port 8080"));

const io = new Server(server);

io.on('connection', socket => {
    console.log(`Cliente ${socket.id} conectado.`);
});

app.set('socketio', io);