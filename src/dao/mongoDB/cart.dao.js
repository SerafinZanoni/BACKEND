import { cartModel } from "./models/cart.model.js";

const getAll = async () => {
  const cart = await cartModel.find({ status: true });
  return cart;
};
const getById = async (id) => {
  const cart = await cartModel.findById(id).populate("products.product");
  return cart;
};
const create = async () => {
  const cart = await cartModel.create({});
  return cart;
};
const update = async (id, data) => {
  const cartUpdate = await cartModel.findByIdAndUpdate(id, data, { new: true });
  return cartUpdate;
};
const deleteOne = async (id) => {
  const cart = await cartModel.deleteOne({ _id: id });
  return cart;
};

///AGREGANDO UN PRODUCTO AL CARRITO O INCREMENTANDO SI TAL PRODUCTO EXITE
const addProductToCart = async (id, pid) => {
  //OBTENEMOS EL PRODUCTO POR PARAMS ID Y LO GUARDAMOS EN LA CONSTANTE PRODUCT LO MISMO CON  CART
  ////////////////////////////////////////////////
  ///VERIFICAMOS LA EXISTENCIA DEL PRODUCTO Y DEL CART
  // const product = await productModel.findById(pid);
  // if (!product) return { product: false };
  // const cart = await cartModel.findById(id);
  // if (!cart) return { cart: false };
  /////////////////////////////////////////////
  ////
  //SI EL PRODUCTO SE ENCUETNRA EN CART SE INCREMENTA EN 1
  const productInCart = await cartModel.findOneAndUpdate(
    { _id: id, "products.product": pid },
    { $inc: { "products.$.quantity": 1 } }
  );

  //SI PRODUCTO EN EL CARRO NO EXISTE SE INICIALIZA EN 1
  if (!productInCart) {
    await cartModel.updateOne(
      { _id: id },
      { $push: { products: { product: pid, quantity: 1 } } }
    );
  }
  const cartUpdate = await cartModel.findById(id);

  return cartUpdate;
};

const deletePorductToCart = async (id, pid) => {
  const cart = await cartModel.findById(id);
  cart.products = cart.products.filter((element) => element.product != pid);

  await cart.save();
  return cart;
};

const updateModifyQuantity = async (id, pid, quantity) => {
  const cart = await cartModel.findById(id);

  const product = cart.products.find((element) => element.product == pid);

  product.quantity = quantity;

  await cart.save();
  return cart;
};

const deleteProductsTocarts = async (id) => {
  const cart = await cartModel.findById(id);

  cart.products = [];

  await cart.save();
  return cart;
};

export default {
  getAll,
  getById,
  create,
  update,
  deleteOne,
  addProductToCart,
  deletePorductToCart,
  updateModifyQuantity,
  deleteProductsTocarts,
};