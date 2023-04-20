import express from 'express';
import productRouter from './routes/products.router.js';
import cartsRouter from './routes/cart.router.js';

const app = express();

// Parámetros de configuración
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products',productRouter);
app.use('/api/carts', cartsRouter);

// ----- CRUD ----- 
// READ
app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    const productsLimit = products.splice(0, limit);
    !limit ? res.send({products}) : res.send({productsLimit});
});

app.get('/products/:pid', async (req, res) => {
    const pib = Number(req.params.pid);
    const product = await productManager.getProductById(pib);
    product ? res.send({product}) : res.send('No se encontró el producto.');
});

// CREATE
app.post('', async (req, res) => {
    // const i = req.body;
    if(!user.first_name || !user.last_name) {
        return res.status(400).send({ status: 'error', error: 'incomplete values' });
    }
});



app.listen(8080, () => console.log("Server running on port 8080"));
