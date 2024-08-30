import { Router } from "express";
import { verifyDataProduct } from "../middlewares/verifyDataProduct.middleware.js";
import { verifyProductExist } from "../middlewares/verifyProductExist.middleware.js";
import { authorization } from "../middlewares/authorization.middleware.js";
import productsControllers from "../controllers/products.controllers.js";
import { passportCall } from "../middlewares/passport.middleware.js";

const router = Router();

/// OBTENEMOS LOS PRODUCTOS SEGUN LOS FILTROS DEFINIDOS POR PARAMS DESDE QUERY
router.get("/", productsControllers.getProducts);
///AGREGAMOS NUEVO PRODUCTO PERO ANTES SE VERIFICA LA DATA CON MIDDLEWARE.
router.post(
  "/",
  passportCall("jwt"),
  authorization("admin"),
  verifyDataProduct,
  productsControllers.createproduct
);

////ELIMINAMOS UN PRODUCTO MEDIANTE ID
router.delete(
  "/:pid",
  passportCall("jwt"),
  verifyProductExist,
  authorization("admin"),
  productsControllers.deleteProduct
);

////MODIFICAMOS LA DATA DE UN PRODUCTO
router.put(
  "/:pid",
  passportCall("jwt"),
  verifyProductExist,
  authorization("admin"),
  productsControllers.updateModifyProduct
);

/////BUSCAMOS UN PRODUCTO MEDIANTE ID
router.get("/:pid", verifyProductExist, productsControllers.getproductById);

export default router;