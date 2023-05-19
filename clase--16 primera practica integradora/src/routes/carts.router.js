import { Router } from 'express';
import CartManager from '../dao/fileManagers/cartManager.js';

const router = Router();
const cartManager = new CartManager('./src/files/Carrito.json');

router.post('/', async(req, res) => {
    const cart = {
        products: []
    };
    const result = await cartManager.addCart(cart);
    res.send({ status: 'success', result });
});

router.post('/:cid/product/:pid', async(req, res) => {
    const cartId = Number(req.params.cid);
    const productId = Number(req.params.pid);

    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
        return res.status(404).send({ error: 'Cart not found.' });
    }

    const result = await cartManager.updateCart(cartId, productId);
    res.send({ status: 'success', result });
});

router.get('/:cid', async(req, res) => {
    const cartId = Number(req.params.cid);
    const cart = await cartManager.getCartById(cartId);
    if (!cart) {
        return res.status(404).send({ error: 'Cart not found.' });
    }
    res.send({ status: 'success', cart });
});

export default router;