import TicketsRepository from '../repositories/tickets.repository.js';
import ProductsRepository from '../repositories/products.repository.js';

const ticketsRepository = new TicketsRepository();
const productsRepository = new ProductsRepository();

// {   
//     code: String,
//     purchase_datetime: String,
//     amount: Number,
//     purchaser: String
// }

const purchase = async (user, products) => {
    const backorder = [], purchasedProducts = [];

    for (const product of products) {
        const productResult = await productsRepository.getProductById(product.product._id);

        if (product.quantity <= productResult.stock) {
            purchasedProducts.push(product);
            
            await productsRepository.updateProduct(product.product._id, { stock: (productResult.stock - product.quantity) });
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

    // Retornar también un array con los ids de los productos que no se compraron por falta de stock,
    // esto tiene que llegar al carrito del usuario y quedar ahí, borrar los que sí se compraron.

    return {result, backorderCart: backorder};
}

export { purchase };