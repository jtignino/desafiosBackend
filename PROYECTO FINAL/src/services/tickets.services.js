import TicketsRepository from '../repositories/tickets.repository.js';
import ProductsRepository from '../repositories/products.repository.js';

import { Products, Tickets } from '../dao/factory.js';

const tickets = new Tickets();
const ticketsRepository = new TicketsRepository(tickets);

const products = new Products();
const productsRepository = new ProductsRepository(products);


const purchase = async (user, products) => {
    const backorder = [], purchasedProducts = [];

    for (const product of products) {
        const productDB = await productsRepository.getProductById(product.product._id);

        if (product.quantity <= productDB.stock) {
            purchasedProducts.push({ product: productDB, quantity: product.quantity });

            await productsRepository.updateProduct(product.product._id, { stock: (productDB.stock - product.quantity) });
        } else {
            backorder.push(product.product._id);
        }
    }

    const code = String(Date.now() + Math.floor(Math.random() * 100000 + 1));

    const purchase_datetime = Date.now();

    const amount = purchasedProducts.reduce((acc, prev) => {
        acc += prev.product.price * prev.quantity;
        return acc;
    }, 0);

    const ticket = {
        code: code,
        purchase_datetime: purchase_datetime,
        amount: amount,
        purchaser: user.email
    };

    const result = await ticketsRepository.createTicket(ticket);

    return { result, backorderCart: backorder };
}

export { purchase };