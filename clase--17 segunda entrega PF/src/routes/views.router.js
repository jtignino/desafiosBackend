import { Router } from "express";
import ProductManager from '../dao/fileManagers/product.manager.js';
import productModel from '../dao/models/product.model.js';

const router = Router();
const productManager = new ProductManager('./src/files/Productos.json');

router.get('/', async (req, res) => {
    const user = {
        name: 'Jon'
    };

    const products = await productManager.getProducts();

    res.render('home', {
        user,
        products
    });
});

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
    // console.log(typeof query, query)
    const sortValidator = sort || false;
    console.log(typeof sortValidator, sortValidator)

    const queryValidator = query || false;
    // console.log(typeof queryValidator, queryValidator)

    let prevLink = null;
    let nextLink = null;

    try {
        if (sortValidator) {
            sortObject = { price: sort };
        } else {
            sortObject = {};
        }
    
        if (queryValidator === "true") {
            console.log('true');
            queryObject = { status: query };
        } else if (queryValidator === false) {
            console.log('false');

            queryObject = {};
        } else {
            console.log('tercer if');

            queryObject = { category: query };
        }
    
        const {
            docs,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage
        } = await productModel.paginate(queryObject, { limit, page, lean: true, sort: sortObject });
        console.log(docs)
        const products = docs;

        if (!sortValidator) {
            if (hasPrevPage) {
                prevLink = `/products?page=${prevPage}&limit=${limit}&query=${query}`;
                console.log("prev", prevLink);
            } 
            if (hasNextPage) {
                nextLink = `/products?page=${nextPage}&limit=${limit}&query=${query}`;
                console.log("next", nextLink);
            } 
        } else {
            if (hasPrevPage) {
                prevLink = `/products?page=${prevPage}&limit=${limit}&query=${query}&sort=${sort}`;
                console.log("prev", prevLink);
            } 
            if (hasNextPage) {
                nextLink = `/products?page=${nextPage}&limit=${limit}&query=${query}&sort=${sort}`;
                console.log("next", nextLink);
            }
        }

        // res.send({
        //     status: 'success',
        //     products,
        //     totalPages,
        //     prevPage,
        //     nextPage,
        //     page,
        //     hasPrevPage,
        //     hasNextPage,
        //     prevLink,
        //     nextLink
        // });

        res.render('products', {
            status: 'success',
            products,
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