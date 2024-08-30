import { request, response } from "express";
import cartServices from "../services/cart.services.js";
import ticketServices from "../services/ticket.services.js";

const createCart = async (req, res) => {
  try {
    const newCart = await cartServices.createCart();

    res.status(201).json({ status: "success", newCart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const getCartById = async (req = request, res = response) => {
  try {
    const { cId } = req.params;
    const cart = await cartServices.getCartById(cId);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const addProductToCart = async (req, res) => {
  try {
    const { cId, pid } = req.params;

    const cart = await cartServices.addProductToCart(cId, pid);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const deletePorductToCart = async (req, res) => {
  try {
    const { cId, pid } = req.params;
    const cart = await cartServices.deletePorductToCart(cId, pid);

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const updateModifyQuantity = async (req, res) => {
  try {
    const { cId, pid } = req.params;
    const { quantity } = req.body;
    const cartModify = await cartServices.updateModifyQuantity(
      cId,
      pid,
      quantity
    );

    res.status(200).json({ status: "success", cartModify });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const deletePorductToCarts = async (req, res) => {
  try {
    const { cId } = req.params;
    const cart = await cart.deleteProductsTocarts(cId);

    res.status(200).json({ status: "success", cart });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};

const purchaseCart = async (req, res) => {
  try {
    const { cId } = req.params;
    const cart = await cartServices.getCartById(cId);
    if (!cart) return res.status(404).json({ status: "Error", msg: "Carrito no encontrado" });

    const total = await cartServices.purchaseCart(cId);
    const ticket  =await ticketServices.createticket(req.user.email, total);

    res.status(200).json({status: "sucess", ticket})

  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
  }
};



export default {
  createCart,
  getCartById,
  addProductToCart,
  deletePorductToCart,
  deletePorductToCarts,
  updateModifyQuantity,
  purchaseCart,
};