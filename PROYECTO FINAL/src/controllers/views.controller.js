import * as productsService from '../services/products.services.js';

const register = (req, res) => {
    try {
        res.render('register');
    } catch (error) {
        console.log(error)
    }
}

const login = (req, res) => {
    try {
        res.render('login');
    } catch (error) {
        console.log(error)
    }
}

const products = async (req, res) => {
    try {
        const { page = 1, limit = 10, query, sort } = req.query;

        if (isNaN(page)) {
            return res.sendClientError('Page not found.');
        }

        const result = await productsService.getAllProducts(query, limit, page, sort);
    
        res.render('products', {
            user: {
                first_name: req.user.first_name,
                email: req.user.email,
                role: req.user.role
            },
            ...result
        });

    } catch (error) {
        res.sendServerError(error.message);
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('coderCookieToken');

        res.clearCookie('cartId');

        res.redirect('/login');

    } catch (error) {
        res.sendServerError(error.message);
    }
}

export {
    register,
    login,
    logout,
    products
}