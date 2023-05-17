import express from 'express';
import productRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import __dirname from './utils.js';


const app = express();

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');

app.use('/api/products',productRouter);
app.use('/api/carts', cartsRouter);

app.use('/', viewsRouter);
app.use('/api/users', usersRouter);

const server = app.listen(8080, () => console.log("Server running on port 8080"));

const io = new Server(server);

io.on('connection', socket => {
    console.log(`Cliente ${socket.id} conectado.`);
});

app.set('socketio', io);