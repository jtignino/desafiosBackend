import { Router } from 'express';
import ProductManager from './managers/productManager.js';

const router = Router();

router.get('/', (req, res) => {
    res.send({ users })
});


export default router;