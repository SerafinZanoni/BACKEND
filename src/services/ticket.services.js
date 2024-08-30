import ticketRepository from "../dao/mongoDB/ticket.repository.js";
import { sendEmail } from "../utils/sendEmail.js";
import envsConfig from "../config/envs.config.js";

const createticket = async ( userEmail, totalCart) => {
    const newTicket = {
        amount: totalCart,
        purchaser: userEmail,
        code: Math.random().toString(36).substr(2,9),
    };

    const ticket = await ticketRepository.create(newTicket);
    
    const ticketString = `
    Ticket de Compra
    ------------------------
    ID de Orden: ${ticket.code}
    User: ${ticket.purchase_datatime}
    ------------------------
    Total: $${ticket.amount}
`;
    await sendEmail(envsConfig.GMAIL_EMAIL, "Ticket de compra", ticketString)
    
    return ticket;
    
}

export default {createticket}