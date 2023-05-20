import { Router } from "express";
import ProductManager from '../dao/fileManagers/productManager.js';

const router = Router();
const productManager = new ProductManager('./src/files/Productos.json');

router.get('/', async (req, res) => {
    const user = {
        name: 'Jon'
    };

    const products = await productManager.getProducts();

    res.render('home', {
        user,
        products
    });
});

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

router.post('/realtimeproducts', async (req, res) => {
    const product = req.body;
    const result = await productManager.addProduct(product);

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getProducts());

    res.send({ status: 'success', result })
})

router.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
    }
    const result = await productManager.deleteProduct(pid);

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getProducts());

    res.send({ status: 'success', result })
})

export default router;