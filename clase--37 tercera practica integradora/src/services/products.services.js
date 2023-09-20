import ProductsRepository from '../repositories/products.repository.js';
import { ProductAlreadyExists, ProductNotFound, ProductUpdateError } from '../utils/custom-exception.js';

const productsRepository = new ProductsRepository();

const saveProduct = async (product) => {
    const result = await productsRepository.addProduct(product);
    return result;
}

const getAllProducts = async (query, limit, page, sort) => {
    const sortObject = sort ? { price: sort } : {};
    let queryObject;

    if (query === 'true') {
        queryObject = { stock: { $gt: 0 } };
    } else if (query === undefined) {
        queryObject = {};
    } else {
        queryObject = { category: query };
    }

    const {
        docs,
        totalPages,
        prevPage,
        nextPage,
        hasPrevPage,
        hasNextPage
    } = await productsRepository.getProducts(queryObject, limit, page, sortObject);

    let urlParams = '';
    urlParams += `&limit=${limit}`;
    (query) && (urlParams += `&query=${query}`);
    (sort) && (urlParams += `&sort=${sort}`);

    let prevLink = hasPrevPage ? `?page=${prevPage}${urlParams}` : null;
    let nextLink = hasNextPage ? `?page=${nextPage}${urlParams}` : null;

    return {
        payload: docs,
        totalPages,
        prevPage,
        nextPage,
        page,
        hasPrevPage,
        hasNextPage,
        prevLink,
        nextLink
    };
}

const getProductById = async (pid) => {
    const product = await productsRepository.getProductById(pid);

    if (!product) throw new ProductNotFound('Product not found.');

    return product;
}

const getByCode = async (code) => {
    const product = await productsRepository.getProductByCode(code);

    if (product) throw new ProductAlreadyExists('The product code you are trying to add already exists.')
}

const updateProduct = async (pid, data) => {
    const product = await productsRepository.updateProduct(pid, data);

    if (!product) throw new ProductUpdateError('The product was not modified.');

    return product;
}

const deleteProduct = async (pid) => {
    const product = await productsRepository.deleteProduct(pid);

    if (!product) throw new ProductNotFound('Product not found.');

    return product;
}

const findProduct = async (pid) => {
    const product = await productsRepository.getProductById(pid);

    return product;
}

export {
    saveProduct,
    getAllProducts,
    getProductById,
    getByCode,
    updateProduct,
    deleteProduct,
    findProduct
}