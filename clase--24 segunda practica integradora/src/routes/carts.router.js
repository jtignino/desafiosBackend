// import { Router } from 'express';
// import Carts from '../dao/dbManagers/cart.manager.js';
// import Products from '../dao/dbManagers/product.manager.js';

import Router from './router.js';
import Carts from '../dao/dbManagers/cart.manager.js';
import Products from '../dao/dbManagers/product.manager.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

const cartManager = new Carts();
const productManager = new Products();

export default class CartsRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, this.create)
        this.post('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.add)
        this.get('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, this.getCart);
        this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, this.getAll);
        this.put('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, this.update);
        this.put('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.updateProductInCart);
        this.delete('/:cid/product/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.delete);
        this.delete('/:cid', ['ADMIN'], passportStrategiesEnum.JWT, this.deleteProducts);
    }

    async create(req, res) {
        try {
            const cart = {
                products: []
            };

            const result = await cartManager.createCart(cart);

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async add(req, res) {
        try {
            const { cid, pid } = req.params;
            const { qty = 1 } = req.body;

            const product = await productManager.getProductById(pid);

            if (product.length === 0) {
                return res.sendClientError('Product not found.');
            }

            const cart = await cartManager.getCartById(cid);

            if (cart.length === 0) {
                return res.sendClientError('Cart not found.');
            }

            const result = await cartManager.addToCart(cid, pid, qty);

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async getCart(req, res) {
        try {
            const { cid } = req.params;

            const cart = await cartManager.getCartById(cid);

            if (cart.length === 0) {
                return res.sendClientError('Cart not found.');
            }

            const products = cart[0].products;

            res.sendSuccess(products);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const carts = await cartManager.getCarts();

            res.sendSuccess(carts);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async update(req, res) {
        try {
            const { cid } = req.params;
            const products = req.body;

            const cart = await cartManager.getCartById(cid);

            if (cart.length === 0) {
                return res.sendClientError('Cart not found.');
            }

            products.forEach(async product => {
                const result = await cartManager.updateProductInCart(cid, product.product, product.quantity);

                (result === null) && (await cartManager.addToCart(cid, product.product, product.quantity));
            });

            const result = await cartManager.getCartById(cid);

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async updateProductInCart(req, res) {
        try {
            const { cid, pid } = req.params;
            const { qty = 1 } = req.body;

            const product = await productManager.getProductById(pid);

            if (product.length === 0) {
                return res.status(404).send({ status: 'error', message: 'Product not found.' });
            }

            const result = await cartManager.updateProductInCart(cid, pid, qty);

            if (result === null) {
                return res.status(404).send({ status: 'error', message: 'Cart not found.' });
            }

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { cid, pid } = req.params;

            const product = await productManager.getProductById(pid);

            if (product.length === 0) {
                return res.sendClientError('Product not found.');
            }

            const result = await cartManager.deleteProduct(cid, pid);

            if (result === null) {
                return res.sendClientError('Cart not found.');
            }

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async deleteProducts(req, res) {
        try {
            const { cid } = req.params;

            const result = await cartManager.deleteCart(cid);

            if (result === null) {
                return res.status(404).send({ status: 'error', message: 'Cart not found.' });
            }

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }
}


// -----------------------------------------------

// router.post('/', async (req, res) => {
//     const cart = {
//         products: []
//     };

//     try {
//         const result = await cartManager.createCart(cart);
//         res.send({ status: 'success', payload: result })
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// router.post('/:cid/product/:pid', async (req, res) => {
//     const { cid, pid } = req.params;
//     const { qty = 1 } = req.body;

//     try {
//         const product = await productManager.getProductById(pid);

//         if (product.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Product not found.' });
//         }

//         const cart = await cartManager.getCartById(cid);

//         if (cart.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Cart not found.' });
//         }

//         const result = await cartManager.addToCart(cid, pid, qty);

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// router.get('/:cid', async (req, res) => {
//     const { cid } = req.params;

//     try {
//         const cart = await cartManager.getCartById(cid);

//         if (cart.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Cart not found.' });
//         }

//         const products = cart[0].products;

//         res.render('cart', { products });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// Agrego un servicio más para consultar todos los carritos, no está pedido dentro de la consigna.
// router.get('/', async (req, res) => {
//     try {
//         const carts = await cartManager.getCarts();

//         res.send({ status: 'success', payload: carts });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// Recorro el array de products que viene en el body para enviar un elemento a la vez al método "updateProductInCart", 
// el cual se encarga de actualizar el producto si es que existe en el carrito.
// Si no existe entonces retorna NULL, y llamo al método "addToCart" para agregarlo. 
// De esta manera no se me duplican los productos dentro del mismo carrito.
// Luego hago una consulta con "getCartById" solo para poder ver el resultado de la actualización. 

// router.put('/:cid', async (req, res) => {
//     const { cid } = req.params;
//     const products = req.body;

//     try {
//         const cart = await cartManager.getCartById(cid);

//         if (cart.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Cart not found.' });
//         }

//         products.forEach(async product => {
//             const result = await cartManager.updateProductInCart(cid, product.product, product.quantity);

//             (result === null) && (await cartManager.addToCart(cid, product.product, product.quantity));
//         });

//         const result = await cartManager.getCartById(cid);

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// router.put('/:cid/product/:pid', async (req, res) => {
//     const { cid, pid } = req.params;
//     const { qty = 1 } = req.body;

//     try {
//         const product = await productManager.getProductById(pid);

//         if (product.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Product not found.' });
//         }

//         const result = await cartManager.updateProductInCart(cid, pid, qty);

//         if (result === null) {
//             return res.status(404).send({ status: 'error', message: 'Cart not found.' });
//         }

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// router.delete('/:cid/product/:pid', async (req, res) => {
//     const { cid, pid } = req.params;

//     try {
//         const product = await productManager.getProductById(pid);

//         if (product.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Product not found.' });
//         }

//         const result = await cartManager.deleteProduct(cid, pid);

//         if (result === null) {
//             return res.status(404).send({ status: 'error', message: 'Cart not found.' });
//         }

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


// En este endpoint se pide que se borren los productos del carrito, pero no dice que se borre el carrito completo, por lo cual hice que el método deleteCart() le asigne un array vacío [] al atributo "products".
// router.delete('/:cid', async (req, res) => {
//     const { cid } = req.params;

//     try {
//         const result = await cartManager.deleteCart(cid);

//         if (result === null) {
//             return res.status(404).send({ status: 'error', message: 'Cart not found.' });
//         }

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

// export default router;