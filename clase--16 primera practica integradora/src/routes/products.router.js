import { Router } from 'express';
import ProductManager from '../dao/fileManagers/productManager.js';
import Products from '../dao/dbManagers/productManager.js';

const router = Router();
// const productManager = new ProductManager('./src/files/Productos.json');
const productManager = new Products();

// CRUD usando MongoDB 
router.post('/', async (req, res) => {
    const { title, description, code, price, category, stock, status } = req.body;

    if (!title || !description || !code || !price || !category || !stock) {
        return res.status(400).send({ status: 'error', error: 'Incomplete values.' });
    }

    try {
        const result = await productManager.addProduct({
            title,
            description,
            code,
            price,
            stock,
            category,
            status
        });
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.send({ status: 'success', payload: products });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const product = await productManager.getProductById(pid);
        res.send({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    const data = req.body;

    if (!data.title || !data.description || !data.code || !data.price || !data.category || !data.stock) {
        return res.status(400).send({ status: 'error', error: 'Incomplete values.' });
    }

    try {
        const result = await productManager.updateProduct(pid, data);
        res.send({ status: 'success', payload: result });  
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params;

    try {
        const result = await productManager.deleteProduct(pid);
        res.send({ status: 'success', payload: result });  
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

/*
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
});

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
*/

export default router;