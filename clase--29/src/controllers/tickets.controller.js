import * as ticketsService from '../services/tickets.services.js';
import * as usersService from '../services/users.services.js';

const purchase = async (req, res) => {
    try {
        const { user, products } = req.body;

        const userResult = await usersService.getUserById(user);

        if(!userResult) {
            return res.sendClientError('User not found.');
        };

        const result = await ticketsService.purchase(user, products);

        res.sendSuccess(result);

    } catch (error) {
        res.sendServerError(error.message);
    }
}

export {
    purchase
}

