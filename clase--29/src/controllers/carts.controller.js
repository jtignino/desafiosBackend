import {
    create as createService,
    getById as getCartByIdService,
    getAll as getAllCartsService,
    add as addCartService,
    update as updateProductInCartService,
    deleteProduct as deleteProductInCartService,
    emptyCart as deleteCartService
} from '../services/carts.services.js';

import { getById as getProductByIdService } from '../services/products.services.js';

import * as ticketsService from '../services/tickets.services.js';

import * as usersService from '../services/users.services.js';

const create = async (req, res) => {
    try {
        const cart = {
            products: []
        };

        const result = await createService(cart);

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const add = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { qty = 1 } = req.body;

        const product = await getProductByIdService(pid);

        if (product.length === 0) {
            return res.sendClientError('Product not found.');
        }

        const cart = await getCartByIdService(cid);

        if (cart.length === 0) {
            return res.sendClientError('Cart not found.');
        }

        const result = await addCartService(cid, pid, qty);

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await getCartByIdService(cid);

        if (cart.length === 0) {
            return res.sendClientError('Cart not found.');
        }

        const products = cart[0].products;

        res.sendSuccess(products);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getAll = async (req, res) => {
    try {
        const carts = await getAllCartsService();

        res.sendSuccess(carts);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const purchase = async (req, res) => {
    try {
        const { cid } = req.params;

        const { user } = req.body;

        const cart = await getCartByIdService(cid);

        if (cart.length === 0) {
            return res.sendClientError('Cart not found.');
        }
        
        const products = cart[0].products;

        const userResult = await usersService.getUserById(user);

        if(!userResult) {
            return res.sendClientError('User not found.');
        };

        const {result, backorderCart} = await ticketsService.purchase(userResult, products);

        res.sendSuccess({result, backorderCart});

    } catch (error) {
        res.sendServerError(error.message);
    }
}

const update = async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;

        const cart = await getCartByIdService(cid);

        if (cart.length === 0) {
            return res.sendClientError('Cart not found.');
        }

        products.forEach(async product => {
            const result = await updateProductInCartService(cid, product.product, product.quantity);

            (result === null) && (await addCartService(cid, product.product, product.quantity));
        });

        const result = await getCartByIdService(cid);

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const updateProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { qty = 1 } = req.body;

        const product = await getProductByIdService(pid);

        if (product.length === 0) {
            return res.sendClientError('Product not found.');
        }

        const result = await updateProductInCartService(cid, pid, qty);

        if (result === null) {
            return res.sendClientError('Cart not found.');
        }

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        const product = await getProductByIdService(pid);

        if (product.length === 0) {
            return res.sendClientError('Product not found.');
        }

        const result = await deleteProductInCartService(cid, pid);

        if (result === null) {
            return res.sendClientError('Cart not found.');
        }

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const result = await deleteCartService(cid);

        if (result === null) {
            return res.sendClientError('Cart not found.');
        }

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

export {
    create,
    add,
    getCart,
    getAll,
    purchase,
    update,
    updateProductInCart,
    deleteProduct,
    emptyCart
}