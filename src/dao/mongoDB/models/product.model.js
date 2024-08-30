import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productCollerction = "product";


const productSchema = new mongoose.Schema({

    title: String,
    description: String,
    price: Number,
    thumbnail: {
        type: Array,
        default: [],
    },
    code: String,
    stock: Number,
    category: String,
    status: {
        type: Boolean,
        default: true,
    },
});

///ESTE ES EL PLUGIN PARA PODER UTILIZAR LA PAGINACION EN NUESTRA API
productSchema.plugin(mongoosePaginate);

export const productModel = mongoose.model(productCollerction, productSchema);