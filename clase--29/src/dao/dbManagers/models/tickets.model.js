import mongoose from 'mongoose';

const ticketsCollection = 'tickets';

const ticketSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: String,
    amount: Number,
    purchaser: String
});

// ticketSchema.pre('find', function () {
//     this.populate('business');
// });

const ticketModel = mongoose.model(ticketsCollection, ticketSchema);

export default ticketModel;