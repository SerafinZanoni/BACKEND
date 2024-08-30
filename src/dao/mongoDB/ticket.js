import {ticketModel} from "./models/ticket.model.js"

const getAll = async (query, option) => {
    ////AQUI APLICAMOS LA PAGINACION SEGUN LOS DOS PARAMETROS QUE NOS LLEGAN QUERY Y OPTION
    const tickets = await ticketModel.paginate(query, option);
    return tickets
};
const getById = async (id) => {
    const ticket = await ticketModel.findById(id);
    return ticket;
};
const create = async (data) => {
    const ticket = await ticketModel.create(data);
    return ticket;
};
const update = async (id, data) => {
    const ticketUpdate = await ticketModel.findByIdAndUpdate(id, data, { new: true });
    return ticketUpdate;
};
const deleteOne = async (id) => {
    const ticket = await ticketModel.findByIdAndUpdate(id, {status: false}, { new: true });
    return ticket;
};


export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};