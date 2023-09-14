import * as productsService from '../services/products.services.js';
import { ProductAlreadyExists, ProductNotFound, ProductUpdateError } from '../utils/custom-exception.js';

const saveProduct = async (req, res) => {
    try {
        const { title, description, code, price, category, stock, status } = req.body;

        if (!title || !description || !code || !price || !category || !stock) {
            return res.sendClientError('Incomplete values.');
        }

        await productsService.getByCode(code);

        const result = await productsService.saveProduct({ ...req.body });

        res.sendSuccess(result);

    } catch (error) {
        if (error instanceof ProductAlreadyExists)
            return res.sendClientError('The product code you are trying to add already exists.')

        res.sendServerError(error.message);
    }
}

const getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, query, sort } = req.query;

        if (isNaN(page)) {
            return res.sendClientError('Page not found.');
        }

        const result = await productsService.getAllProducts(query, limit, page, sort);

        res.sendSuccess(result);

    } catch (error) {
        res.sendServerError(error.message);
    }
}

const getProductById = async (req, res) => {
    try {
        const { pid } = req.params;

        const product = await productsService.getProductById(pid);

        res.sendSuccess(product);

    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;

        const data = { ...req.body };

        await productsService.getProductById(pid);

        const result = await productsService.updateProduct(pid, data);

        res.sendSuccess(result);

    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);

        if (error instanceof ProductUpdateError) return res.sendClientError(error.message);


        res.sendServerError(error.message);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;

        const result = await productsService.deleteProduct(pid);

        res.sendSuccess(result);

    } catch (error) {
        if (error instanceof ProductNotFound) return res.sendClientError(error.message);

        res.sendServerError(error.message);
    }
}

export {
    saveProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}