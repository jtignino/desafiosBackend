export default class TicketsRepository {
    constructor(dao) {
        this.dao = dao;
    }

    createTicket = async (ticket) => {
        const result = await this.dao.createTicket(ticket);
        return result;
    }

}