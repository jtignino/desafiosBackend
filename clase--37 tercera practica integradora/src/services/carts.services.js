import CartsRepository from '../repositories/carts.repository.js';
import { CartNotFound, DeleteProductError } from '../utils/custom-exception.js';

const cartsRepository = new CartsRepository();

const create = async (cart) => {
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

const add = async (cid, pid, qty) => {
    const result = await cartsRepository.addToCart(cid, pid, qty);
    return result;
}

const updateProductInCart = async (cid, pid, qty) => {
    const product = await cartsRepository.updateProductInCart(cid, pid, qty);
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
    add,
    updateProductInCart,
    deleteProduct,
    emptyCart
}