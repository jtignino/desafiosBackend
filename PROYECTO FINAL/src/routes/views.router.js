import Router from './router.js';
import { passportStrategiesEnum } from '../config/enums.config.js';
// import { register } from '../controllers/users.controller.js';
import { login, logout, products, register } from '../controllers/views.controller.js';

export default class ViewsRouter extends Router {
    init() {
        this.get('/register', ['PUBLIC'], passportStrategiesEnum.NOTHING, register)
        this.get('/login', ['PUBLIC'], passportStrategiesEnum.NOTHING, login)
        this.get('/logout', ['PUBLIC'], passportStrategiesEnum.NOTHING, logout)
        this.get('/products', ['PUBLIC'], passportStrategiesEnum.JWT, products)
    }
}


// const publicAccess = (req, res, next) => {
//     if (req.session.user) return res.redirect('/products');
//     next();
// };


// const privateAccess = (req, res, next) => {
//     if (!req.session.user) return res.redirect('/login');
//     next();
// };


// router.get('/register', publicAccess, (req, res) => {
//     res.render('register');
// });

/*
router.get('/login', publicAccess, (req, res) => {
    res.render('login');
});


router.get('/products', privateAccess, async (req, res) => {
    const { page = 1, limit = 10, query, sort } = req.query;
    let sortObject, queryObject;


    if (isNaN(page)) {
        return res.status(404).send({ status: 'error', message: 'Page not found.' });
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

    try {
        const {
            docs,
            totalPages,
            prevPage,
            nextPage,
            hasPrevPage,
            hasNextPage
        } = await productManager.getProducts(queryObject, limit, page, sortObject);

        if (docs.length === 0) {
            return res.status(404).send({ status: 'error', message: 'Page not found.' });
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
            nextLink,
            user: req.session.user
        });

    } catch (error) {
        res.status(500).send({ status: 'error', error });
    }
});

*/
