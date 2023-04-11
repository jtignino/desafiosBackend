import express from 'express';
import ProductManager from './productManager.js';

const app = express();

const productManager = new ProductManager('./src/Productos.json');

app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    const productsLimit = products.splice(0, limit);
    !limit ? res.send({products}) : res.send({productsLimit});
})

app.get('/products/:pid', async (req, res) => {
    const pib = Number(req.params.pid);
    const product = await productManager.getProductById(pib);
    product ? res.send({product}) : res.send('No se encontró el producto.');
})

app.listen(8080, () => console.log("Listening on 8080"))
