import { Router } from "express";
import cartsControllers from "../controllers/carts.controllers.js";
import { verifyCartExist } from "../middlewares/verifyCartExist.middleware.js";
import { isUserCart } from "../middlewares/isUserCart.middleware.js";
import { passportCall } from "../middlewares/passport.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";



const router = Router();

const middlewares = [verifyCartExist,passportCall("jwt"), authorization("user"), isUserCart];

/////FUNCION PARA AGREGAR UN CARRITO
router.post("/",middlewares, 
   cartsControllers.createCart
  );

//////FUNCION PARA VER CARRITO POR ID
router.get("/:cId",
  middlewares, 
  cartsControllers.getCartById
);

////FUNCION PARA AGREGAR UN PRODUCTO AL CARRITO
router.post(
  "/:cId/product/:pid",
  middlewares, 
  cartsControllers.addProductToCart
);

///AQUI ELIMINAMOS UN PRODUCTO DEL CARRITO
router.delete(
  "/:cId/product/:pid",
  middlewares,
  cartsControllers.deletePorductToCart
);

///EN ESTE ENDPOINT REALIZAMOS LA ACTUALIZACION DEL QUNATITY

router.put(
  "/:cId/product/:pid",
  middlewares,
  cartsControllers.updateModifyQuantity
);

//EN ESTE ENDPOINT OBTENEMOS EL ID DEL CARRITO Y LLAMAMOS A
//CART.DAO PARA  VACIAR EL CARRITO A TRAVEZ DE UN ARRAY VACIO.
//EN CASO DE NO COINCIDIR EL ID DEL CART CON NINGUNO DE LA BASE DE DATOS SE MUESTRA EL ERROR
router.delete("/:cId", 
  middlewares, 
  cartsControllers.deletePorductToCarts);

router.get("/:cId/purchase",passportCall("jwt"), authorization("user"), cartsControllers.purchaseCart);

export default router;