import { CARTSDAO } from "../dao/index.js";

const create = async (cart) => {
    const result = await CARTSDAO.createCart(cart);
    return result;
}

const getAll = async () => {
    const carts = await CARTSDAO.getCarts();
    return carts;
}

const getById = async (cid) => {
    const cart = await CARTSDAO.getCartById(cid);
    return cart;
}

const add = async (cid, pid, qty) => {
    const result = await CARTSDAO.addToCart(cid, pid, qty);
    return result;
}

const update = async (cid, pid, qty) => {
    const product = await CARTSDAO.updateProductInCart(cid, pid, qty);
    return product;
}

const deleteProduct = async (cid, pid) => {
    const product = await CARTSDAO.deleteProduct(cid, pid);
    return product;
}

const emptyCart = async (cid, pid) => {
    const result = await CARTSDAO.deleteCart(cid);
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