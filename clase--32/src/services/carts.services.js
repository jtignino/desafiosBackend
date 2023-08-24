import CartsRepository from '../repositories/carts.repository.js';

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
    return cart;
}

const add = async (cid, pid, qty) => {
    const result = await cartsRepository.addToCart(cid, pid, qty);
    return result;
}

const update = async (cid, pid, qty) => {
    const product = await cartsRepository.updateProductInCart(cid, pid, qty);
    return product;
}

const deleteProduct = async (cid, pid) => {
    const product = await cartsRepository.deleteProduct(cid, pid);
    return product;
}

const emptyCart = async (cid, pid) => {
    const result = await cartsRepository.deleteCart(cid);
    return result;
}
export {
    create,
    getAll,
    getById,
    add,
    update,
    deleteProduct,
    emptyCart
}