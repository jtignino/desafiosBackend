import ticketModel from '../models/tickets.model.js';

export default class TicketsDao {
    
    createTicket = async (ticket) => {
        const result = await ticketModel.create(ticket);
        return result;
    }
    
}