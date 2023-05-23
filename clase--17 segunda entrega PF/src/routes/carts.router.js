import { Router } from 'express';
import CartManager from '../dao/fileManagers/cart.manager.js';
import Carts from '../dao/dbManagers/cart.manager.js';

const router = Router();
const cartManager = new Carts();
// const cartManager = new CartManager('./src/files/Carrito.json');

// CRUD usando MongoDB 
router.post('/', async (req, res) => {
    const cart = {
        products: []
    };

    try {
        const result = await cartManager.createCart(cart);
        res.send({ status: 'success', payload: result })
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    let { qty } = req.body;
    if (qty === undefined) qty = 1;

    try {
        const result = await cartManager.addToCart(cid, pid, qty);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.put('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { qty } = req.body;
    if (qty === undefined) qty = 1;

    try {
        const result = await cartManager.updateCart(cid, pid, qty);
        res.send({ status: 'success', payload: result });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

router.get('/:cid', async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartManager.getCartById(cid);
        const products = cart[0].products;
        console.log(products);
        // res.send({ status: 'success', payload: products })
        res.render('cart', { products });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

// Agrego un servicio más para consultar todos los carritos, esto no está pedido dentro de la consigna
router.get('/', async (req, res) => {
    try {
        const carts = await cartManager.getCarts();
        res.send({ status: 'success', payload: carts });
    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

export default router;