import TicketsRepository from '../repositories/tickets.repository.js';

const ticketsRepository = new TicketsRepository();

// {   
//     code: String,
//     purchase_datetime: String,
//     amount: Number,
//     purchaser: String
// }

const purchase = async (user, products) => {

    // Validación de stock de los prodcuts recibidos

    const code = Date.now() + Math.floor(Math.random * 100000 + 1);
    
    const purchase_datetime = Date.now();

    const amount = products.reduce((acc, prev) => {
        acc += prev.price;
        return acc;
    }, 0);

    const ticket = {
        code: code,
        purchase_datetime: purchase_datetime,
        amount: amount,
        purchaser: user.email
    };

    const ticketResult = await ticketsRepository.createTicket(ticket);

    // Retornar también un array con los ids de los products que no se compraron por falta de stock,
    // esto tiene que llegar al carrito del usuario y quedar ahí, borrar los que sí se compraron.

    return ticketResult;

}

export { purchase };