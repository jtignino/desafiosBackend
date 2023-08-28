import ProductsRepository from '../repositories/products.repository.js';

const productsRepository = new ProductsRepository();

const save = async (product) => {
    const result = await productsRepository.addProduct(product);
    return result;
}

const getAll = async (queryObject, limit, page, sortObject) => {
    const products = await productsRepository.getProducts(queryObject, limit, page, sortObject);
    return products;
}

const getById = async (pid) => {
    const product = await productsRepository.getProductById(pid);
    return product;
}

const getByCode = async (code) => {
    const product = await productsRepository.getProductByCode(code);
    return product;
}

const update = async (pid, data) => {
    const product = await productsRepository.updateProduct(pid, data);
    return product;
}

const deleteProduct = async (pid) => {
    const product = await productsRepository.deleteProduct(pid);
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