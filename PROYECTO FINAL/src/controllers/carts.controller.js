import * as cartsService from '../services/carts.services.js';
import * as productsService from '../services/products.services.js';
import * as ticketsService from '../services/tickets.services.js';
import * as usersService from '../services/users.services.js';
import { CartNotFound, DeleteProductError, ProductNotFound, ProductUpdateError, UserNotFound } from '../utils/custom-exception.js';

const create = async (req, res) => {
    try {
        const result = await cartsService.create();

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const addToCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { qty = 1 } = req.body;

        await productsService.getProductById(pid);

        await cartsService.getById(cid);

        const result = await cartsService.addToCart(cid, pid, qty);

        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message, 404);

        if (error instanceof CartNotFound) return res.sendClientError(error.message, 404);

        res.sendServerError(error.message);
    }
}

const getCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await cartsService.getById(cid);

        res.sendSuccess(cart);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message, 404);

        res.sendServerError(error.message);
    }
}

const getAll = async (req, res) => {
    try {
        const carts = await cartsService.getAll();

        res.sendSuccess(carts);
    } catch (error) {
        res.sendServerError(error.message);
    }
}

const purchase = async (req, res) => {
    try {
        const { cid } = req.params;
        const { user } = req.body;

        const cart = await cartsService.getById(cid);

        const products = cart.products;

        const userResult = await usersService.getUserByEmail(user);

        const { ticketResult, backorderCart } = await ticketsService.purchase(userResult, products);

        res.sendSuccess({ ticketResult, backorderCart });

    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);

        if (error instanceof UserNotFound) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const update = async (req, res) => {
    try {
        const { cid } = req.params;
        const products = req.body;  //corregir vulnerabilidad
        const productsNotFound = [];
        let result;

        await cartsService.getById(cid);

        for (const product of products) {
            result = await cartsService.updateProductInCart(cid, product.product, product.quantity);

            if (!result) {
                result = await cartsService.add(cid, product.product, product.quantity);

                if (result === product.product) {
                    productsNotFound.push({ _id: product.product });
                }
            }
        };

        // result = await cartsService.getById(cid);

        res.sendSuccess({ result, productsNotFound });
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);

        // if (error instanceof ProductNotFound) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const updateProductInCart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;

        await cartsService.getById(cid);

        await productsService.getProductById(pid);

        const result = await cartsService.updateProductInCart(cid, pid, quantity);

        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);

        if (error instanceof CartNotFound) return res.sendClientError(error.message);

        if (error instanceof ProductUpdateError) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;

        await productsService.getProductById(pid);

        const result = await cartsService.deleteProduct(cid, pid);

        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);

        if (error instanceof DeleteProductError) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const emptyCart = async (req, res) => {
    try {
        const { cid } = req.params;

        const result = await cartsService.emptyCart(cid);

        res.sendSuccess(result);
    } catch (error) {
        if (error instanceof CartNotFound) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

export {
    create,
    addToCart,
    getCart,
    getAll,
    purchase,
    update,
    updateProductInCart,
    deleteProduct,
    emptyCart
}