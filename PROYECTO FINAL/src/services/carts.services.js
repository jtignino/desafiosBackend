import CartsRepository from '../repositories/carts.repository.js';
import { findProduct } from '../services/products.services.js';
import { CartNotFound, DeleteProductError, ProductUpdateError } from '../utils/custom-exception.js';

import { Carts } from '../dao/factory.js';

const carts = new Carts();
const cartsRepository = new CartsRepository(carts);

const create = async () => {
    const cart = { products: [] };
    const result = await cartsRepository.createCart(cart);
    return result;
}

const getAll = async () => {
    const carts = await cartsRepository.getCarts();
    return carts;
}

const getById = async (cid) => {
    const cart = await cartsRepository.getCartById(cid);

    if (!cart) throw new CartNotFound('Cart not found.');

    return cart;
}

const addToCart = async (cid, pid, qty) => {
    const product = await findProduct(pid);
    
    if (!product) return pid;

    const result = await cartsRepository.addToCart(cid, pid, qty);

    return result;
}

const updateProductInCart = async (cid, pid, qty) => {
    const product = await cartsRepository.updateProductInCart(cid, pid, qty);

    if (!product) throw new ProductUpdateError('Product not found in cart.');

    return product;
}

const deleteProduct = async (cid, pid) => {
    const product = await cartsRepository.deleteProduct(cid, pid);

    if (!product) throw new DeleteProductError('Product or cart not found.');

    return product;
}

const emptyCart = async (cid, pid) => {
    const result = await cartsRepository.emptyCart(cid);

    if (!result) throw new CartNotFound('Cart not found.');

    return result;
}

export {
    create,
    getAll,
    getById,
    addToCart,
    updateProductInCart,
    deleteProduct,
    emptyCart
}