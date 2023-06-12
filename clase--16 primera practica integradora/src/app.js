import express from 'express';
import productRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import { messageModel } from './dao/models/message.model.js';

const app = express();

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products', productRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);
app.use('/api/users', usersRouter);

// Conexión a la DB utilizando mongoose:
try {
    await mongoose.connect('mongodb+srv://jonathanjat:VpF0lkWIlIVJGPpu@cluster39760jt.h28fnid.mongodb.net/ecommerce?retryWrites=true&w=majority');
    console.log('DB connected.');
} catch (error) {
    console.log(error);
}

const server = app.listen(8080, () => console.log("Server running on port 8080"));

const io = new Server(server);

const messages = [];
const messagesDB = await messageModel.find().lean();

io.on('connection', socket => {
    console.log(`Cliente ${socket.id} conectado.`);

    socket.on('message', async data => {
        messages.push(data);
        await messageModel.create(data);
        const messagesDB = await messageModel.find().lean();
        io.emit('messageLogs', messagesDB);
    });

    socket.on('authenticated', async data => {
        const messagesDB = await messageModel.find().lean();
        socket.emit('messageLogs', messagesDB);
        socket.broadcast.emit('newUserConnected', data);
    });
});

app.set('socketio', io);