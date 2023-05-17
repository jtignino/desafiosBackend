import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();
const productManager = new ProductManager('./src/files/Productos.json');

router.post('/', async (req, res) => {
    const product = req.body;

    if (!product.status) {
        product.status = true;
    }

    if (!product.title || !product.description || !product.code || !product.price || !product.category || !product.stock) {
        return res.status(400).send({ error: 'Valores incompletos.' });
    }

    const result = await productManager.addProduct(product)
    res.send({ status: 'success', result })
});

router.get('/', async (req, res) => {
    const { limit } = req.query;
    const products = await productManager.getProducts();
    const productsLimit = products.splice(0, limit);
    !limit ? res.send({ status: 'success', products }) : res.send({ status: 'success', productsLimit });
});

router.get('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const product = await productManager.getProductById(pid);
    product ? res.send({ status: 'success', product }) : res.status(404).send({ error: 'Product not found.' });
})

router.put('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const data = req.body;
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
    }
    const result = await productManager.updateProduct(pid, data);
    res.send({ status: 'success', result })
});

router.delete('/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
    }
    const result = await productManager.deleteProduct(pid);
    res.send({ status: 'success', result })
})

export default router;