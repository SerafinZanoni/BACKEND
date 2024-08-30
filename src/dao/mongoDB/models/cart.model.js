import mongoose from "mongoose";

const cartCollerction = "cart";

const cartSchema = new mongoose.Schema({
    ///ACA SE ESTRUCTURA EL ESQUEMA DEL CARRITO EL CUAL TENDRA SOLO EL ID DEL PRODUCTO Y LA CANTIDAD, Y NO TODOS LOS ELEMENTOS DEL CARRITO
    products: {
        type: [{
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"product"},
                quantity: Number}],
        default:[],
    },
});

cartSchema.pre("find", function (){
    this.populate("products.product")
  })

export const cartModel = mongoose.model(cartCollerction, cartSchema);