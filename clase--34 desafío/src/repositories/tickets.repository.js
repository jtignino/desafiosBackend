import TicketsDao from "../dao/dbManagers/classes/tickets.dao.js";

export default class TicketsRepository {
    constructor() {
        this.dao = new TicketsDao();
    }

    createTicket = async (ticket) => {
        const result = await this.dao.createTicket(ticket);
        return result;
    }

}