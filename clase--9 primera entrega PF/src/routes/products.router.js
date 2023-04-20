import { Router } from 'express';
import ProductManager from './managers/productManager.js';

const router = Router();
const productManager = new ProductManager('./src/Productos.json');

router.get('/', (req, res) => {
    res.send({ users })
});

router.post('/', (req, res) => {
    // {
    //     name: 'Alex',
    //     lastname: 'Pinaida'
    // }
    const user = req.body;
    // users.push(user);
    res.send({ status: 'success', user })
});

export default router;