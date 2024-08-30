import { request, response } from "express";


///VERIFICAMOS QUE EL CARRITO ES DEL USUARIO LOGUEADO
export const isUserCart = async (req = request, res = response, next) => {
  
  const { cId } =  req.params;

  if (!req.user) {
    return res.status(401).json({ status: "error", msg: "Unauthorized" });
  }
  if (req.user.cart._id !== cId) {
    console.log(cId)
    return res.status(401).json({ status: "error", msg: "Wrong cart user" });
  }
  next();
};