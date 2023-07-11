// import { Router } from 'express';
// import ProductManager from '../dao/fileManagers/product.manager.js';
// import Products from '../dao/dbManagers/product.manager.js';

import Router from './router.js';
import Products from '../dao/dbManagers/product.manager.js';
import { passportStrategiesEnum } from '../config/enums.config.js';

const productManager = new Products();

export default class ProductsRouter extends Router {
    init() {
        this.post('/', ['ADMIN'], passportStrategiesEnum.JWT, this.save)
        this.get('/', ['ADMIN'], passportStrategiesEnum.JWT, this.getAll);
        this.get('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.getById);
        this.put('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.update);
        this.delete('/:pid', ['ADMIN'], passportStrategiesEnum.JWT, this.delete);
    }

    async save(req, res) {
        try {
            const { title, description, code, price, category, stock, status } = req.body;

            if (!title || !description || !code || !price || !category || !stock) {
                return res.sendClientError('Incomplete values.');
            }

            const findCode = await productManager.getProductByCode(code);

            if (findCode.length > 0) {
                return res.sendClientError('The product code you are trying to add already exists.');
            }

            const result = await productManager.addProduct({
                title,
                description,
                code,
                price,
                stock,
                category,
                status
            });
            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async getAll(req, res) {
        try {
            const { page = 1, limit = 10, query, sort } = req.query;
            let sortObject, queryObject;


            if (isNaN(page)) {
                return res.sendClientError('Page not found.');
            }

            const sortValidator = sort || false;
            (sortValidator) ? (sortObject = { price: sort }) : (sortObject = {});   // utilizo este validador para saber qué parámetros debo enviarle al ".paginate()"

            const queryValidator = query || false;

            // Bloque de cod. que valida si recibí en la URL un "query" de tipo falsy, o un string igual a "true" (para los casos en que quiera filtrar por disponibilidad, o sea por stock > 0), o un string con el nombre de la categoría que quiero filtrar:
            if (queryValidator === "true") {
                queryObject = { stock: { $gt: 0 } };
            } else if (queryValidator === false) {
                queryObject = {};
            } else {
                queryObject = { category: query };
            }
            // Fin del bloque

            const {
                docs,
                totalPages,
                prevPage,
                nextPage,
                hasPrevPage,
                hasNextPage
            } = await productManager.getProducts(queryObject, limit, page, sortObject);

            if (docs.length === 0) {
                return res.sendClientError('Page not found.');
            }

            const products = docs;

            // Bloque de cod. para concatenar los params (si es que existen) y crear los links:
            let urlParams = '';
            urlParams += `&limit=${limit}`;
            (query) && (urlParams += `&query=${query}`);
            (sort) && (urlParams += `&sort=${sort}`);

            let prevLink = hasPrevPage ? `?page=${prevPage}${urlParams}` : null;
            let nextLink = hasNextPage ? `?page=${nextPage}${urlParams}` : null;
            // Fin del bloque

            res.sendSuccess({
                payload: products,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            });

        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async getById(req, res) {
        try {
            const { pid } = req.params;

            const product = await productManager.getProductById(pid);

            if (product.length === 0) {
                return res.sendClientError('Product not found.');
            }

            res.sendSuccess(product);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async update(req, res) {
        try {
            const { pid } = req.params;
            const { title, description, price, stock, category, status } = req.body;
            const data = { title, description, price, stock, category, status }

            const result = await productManager.updateProduct(pid, data);

            if (result.matchedCount === 0) {
                return res.sendClientError('Product not found.');
            } else if (result.modifiedCount === 0) {
                return res.sendClientError('The product was not modified.');
            }

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

    async delete(req, res) {
        try {
            const { pid } = req.params;
            const result = await productManager.deleteProduct(pid);

            if (result === null) {
                return res.sendClientError('Product not found.');
            }

            res.sendSuccess(result);
        } catch (error) {
            res.sendServerError(error.message);
        }
    }

}


// router.post('/', async (req, res) => {
//     const { title, description, code, price, category, stock, status } = req.body;

//     if (!title || !description || !code || !price || !category || !stock) {
//         return res.status(400).send({ status: 'error', error: 'Incomplete values.' });
//     }

//     try {
//         const findCode = await productManager.getProductByCode(code);
//         if (findCode.length > 0) {
//             return res.status(400).send({ status: 'error', message: 'The product code you are trying to add already exists.' });
//         }

//         const result = await productManager.addProduct({
//             title,
//             description,
//             code,
//             price,
//             stock,
//             category,
//             status
//         });
//         res.send({ status: 'success', payload: result })
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

// router.get('/', async (req, res) => {
//     const { page = 1, limit = 10, query, sort } = req.query;
//     let sortObject, queryObject;


//     if (isNaN(page)) {
//         return res.status(404).send({ status: 'error', message: 'Page not found.' });
//     }

//     const sortValidator = sort || false;
//     (sortValidator) ? (sortObject = { price: sort }) : (sortObject = {});   // utilizo este validador para saber qué parámetros debo enviarle al ".paginate()"

//     const queryValidator = query || false;

//     // Bloque de cod. que valida si recibí en la URL un "query" de tipo falsy, o un string igual a "true" (para los casos en que quiera filtrar por disponibilidad, o sea por stock > 0), o un string con el nombre de la categoría que quiero filtrar:
//     if (queryValidator === "true") {
//         queryObject = { stock: { $gt: 0 } };
//     } else if (queryValidator === false) {
//         queryObject = {};
//     } else {
//         queryObject = { category: query };
//     }
//     // Fin del bloque

//     try {
//         const {
//             docs,
//             totalPages,
//             prevPage,
//             nextPage,
//             hasPrevPage,
//             hasNextPage
//         } = await productManager.getProducts(queryObject, limit, page, sortObject);

//         if (docs.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Page not found.' });
//         }

//         const products = docs;

//         // Bloque de cod. para concatenar los params (si es que existen) y crear los links:
//         let urlParams = '';
//         urlParams += `&limit=${limit}`;
//         (query) && (urlParams += `&query=${query}`);
//         (sort) && (urlParams += `&sort=${sort}`);

//         let prevLink = hasPrevPage ? `?page=${prevPage}${urlParams}` : null;
//         let nextLink = hasNextPage ? `?page=${nextPage}${urlParams}` : null;
//         // Fin del bloque

//         res.send({
//             status: 'success',
//             payload: products,
//             totalPages,
//             prevPage,
//             nextPage,
//             page,
//             hasPrevPage,
//             hasNextPage,
//             prevLink,
//             nextLink
//         });

//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

// router.get('/:pid', async (req, res) => {
//     const { pid } = req.params;

//     try {
//         const product = await productManager.getProductById(pid);

//         if (product.length === 0) {
//             return res.status(404).send({ status: 'error', message: 'Product not found.' });
//         }

//         res.send({ status: 'success', payload: product });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

// router.put('/:pid', async (req, res) => {
//     const { pid } = req.params;
//     const { title, description, price, stock, category, status } = req.body;
//     const data = { title, description, price, stock, category, status }

//     try {
//         const result = await productManager.updateProduct(pid, data);

//         if (result.matchedCount === 0) {
//             return res.status(404).send({ status: 'error', message: 'Product not found.' });
//         } else if (result.modifiedCount === 0) {
//             return res.status(400).send({ status: 'error', message: 'The product was not modified.' });
//         }

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });

// router.delete('/:pid', async (req, res) => {
//     const { pid } = req.params;

//     try {
//         const result = await productManager.deleteProduct(pid);

//         if (result === null) {
//             return res.status(404).send({ status: 'error', message: 'Product not found.' });
//         }

//         res.send({ status: 'success', payload: result });
//     } catch (error) {
//         res.status(500).send({ status: 'error', error });
//     }
// });


