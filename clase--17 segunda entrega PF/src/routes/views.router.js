import { Router } from "express";
import ProductManager from '../dao/fileManagers/product.manager.js';
import Products from '../dao/dbManagers/product.manager.js';

const router = Router();
const productManager = new Products();
// const productManager = new ProductManager('./src/files/Productos.json');

router.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

router.post('/realtimeproducts', async (req, res) => {
    const product = req.body;
    const result = await productManager.addProduct(product);

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getProducts());

    res.send({ status: 'success', result })
})

router.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = Number(req.params.pid);
    const product = await productManager.getProductById(pid);
    if (!product) {
        return res.status(404).send({ error: 'Product not found.' });
    }
    const result = await productManager.deleteProduct(pid);

    const io = req.app.get('socketio');
    io.emit("showProducts", await productManager.getProducts());

    res.send({ status: 'success', result })
})

router.get('/products', async (req, res) => {
    const { page = 1, limit = 10, query, sort } = req.query;
    let sortObject, queryObject;


    if (isNaN(page)) {
        return res.status(404).send({ status: 'error', message: 'Page not found.'});
    }
    
    const sortValidator = sort || false;
    (sortValidator) ? (sortObject = { price: sort }) : (sortObject = {});   // utilizo este validador para saber qué parámetros debo enviarle al ".paginate()"
    
    const queryValidator = query || false;
    
    // Bloque de cod. que valida si recibí en la URL un "query" de tipo falsy, o un string igual a "true" (para los casos en que quiera filtrar por disponibilidad, o sea por el atributo "status"), o un string con el nombre de la categoría que quiero filtrar:
    if (queryValidator === "true") {
        queryObject = { status: query };
    } else if (queryValidator === false) {
        queryObject = {};
    } else {
        queryObject = { category: query };
    }
    // Fin del bloque

    try {
        const {
            docs,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage
        } = await productManager.getProducts(limit, page, queryObject, sortObject);

        if (docs.length === 0) {
            return res.status(404).send({ status: 'error', message: 'Page not found.'});
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

        res.render('products', {
            status: 'success',
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
        res.status(500).send({ status: 'error', error });
    }

})

export default router;