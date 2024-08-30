import {productModel} from "./models/products.models.js"

const getAll = async (query, option) => {
    ////AQUI APLICAMOS LA PAGINACION SEGUN LOS DOS PARAMETROS QUE NOS LLEGAN QUERY Y OPTION
    const products = await productModel.paginate(query, option);
    return products
};
const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
};
const create = async (data) => {
    const product = await productModel.create(data);
    return product;
};
const update = async (id, data) => {
    const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
    return productUpdate;
};
const deleteOne = async (id) => {
    const product = await productModel.findByIdAndUpdate(id, {status: false}, { new: true });
    return product;
};


export default {
    getAll,
    getById,
    create,
    update,
    deleteOne,
};