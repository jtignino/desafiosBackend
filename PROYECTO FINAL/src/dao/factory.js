import config from '../config/constants.config.js';

let Users, Products, Carts, Tickets;

const persistence = config.persistence;

switch (persistence) {
    case 'MONGO':
        console.log('MONGO PERSISTENCE')

        const mongoose = await import('mongoose');

        await mongoose.connect(config.mongoUrl);

        const { default: UsersMongo } = await import ('./dbManagers/classes/users.dao.js');
        const { default: ProductsMongo } = await import ('./dbManagers/classes/products.dao.js');
        const { default: CartsMongo } = await import ('./dbManagers/classes/carts.dao.js');
        const { default: TicketsMongo } = await import ('./dbManagers/classes/tickets.dao.js');

        Users = UsersMongo;
        Products = ProductsMongo;
        Carts = CartsMongo;
        Tickets = TicketsMongo;

        break;
        
    case 'FILE':
        // const { default: UsersFile } = await import ('./fileManagers/users.dao.js');
        // Users = UsersFile;
        break;
}

export { Users, Products, Carts, Tickets }