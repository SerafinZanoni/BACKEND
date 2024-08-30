import mongoose from "mongoose";

const ticketCollerction = "ticket";

const ticketSchema = new mongoose.Schema({
    code: {type: String, required: true},
    purchase_datatime: {type: Date, default: Date.now()},
    amount:{type: Number, required: true},
    purchase: {type: String, require: true},

});

export const ticketModel = mongoose.model(ticketCollerction, ticketSchema);