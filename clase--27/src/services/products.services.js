import { PRODUCTSDAO } from "../dao/index.js";

const save = async (product) => {
    const result = await PRODUCTSDAO.addProduct(product);
    return result;
}

const getAll = async (queryObject, limit, page, sortObject) => {
    const products = await PRODUCTSDAO.getProducts(queryObject, limit, page, sortObject);
    return products;
}

const getById = async (pid) => {
    const product = await PRODUCTSDAO.getProductById(pid);
    return product;
}

const getByCode = async (code) => {
    const product = await PRODUCTSDAO.getProductByCode(code);
    return product;
}

const update = async (pid, data) => {
    const product = await PRODUCTSDAO.updateProduct(pid, data);
    return product;
}

const deleteProduct = async (pid) => {
    const product = await PRODUCTSDAO.deleteProduct(pid);
    return product;
}

export {
    save,
    getAll,
    getById,
    getByCode,
    update,
    deleteProduct
}